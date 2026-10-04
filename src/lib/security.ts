const rateStore = new Map<string, number[]>();
const usedVids = new Set<string>();

const WINDOW_MS = 60 * 1000;
const MAX_REQ = 6;

export function checkRateLimit(ip: string): { ok: boolean; wait?: number } {
  const now = Date.now();
  const times = (rateStore.get(ip) || []).filter((t) => now - t < WINDOW_MS);

  if (times.length >= MAX_REQ) {
    const wait = Math.max(1, Math.ceil((times[0] + WINDOW_MS - now) / 1000));
    return { ok: false, wait };
  }

  times.push(now);
  rateStore.set(ip, times);

  if (rateStore.size > 1000) {
    for (const [k, v] of rateStore.entries()) {
      if (!v.length || now - v[v.length - 1] > WINDOW_MS) rateStore.delete(k);
    }
  }

  return { ok: true };
}

export function isVidUsed(id: string): boolean {
  return id ? usedVids.has(id) : false;
}

export function saveVid(id: string): void {
  if (id) usedVids.add(id);
}

export async function verifyTurnstile(tok?: string, ip?: string): Promise<{ ok: boolean; err?: string }> {
  const sec = process.env.TURNSTILE_SECRET_KEY;
  if (!sec) return { ok: true };
  if (!tok) return { ok: false, err: 'Captcha diperlukan.' };

  try {
    const body = new URLSearchParams({ secret: sec, response: tok });
    if (ip) body.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = (await res.json()) as { success: boolean };
    return data.success ? { ok: true } : { ok: false, err: 'Verifikasi captcha gagal.' };
  } catch {
    return { ok: false, err: 'Gagal koneksi ke verifikasi captcha.' };
  }
}
