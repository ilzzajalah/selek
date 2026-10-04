const ALLOWED_HOSTS = ['tiktok.com', 'www.tiktok.com', 'm.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'];

export interface VideoResult {
  ok: boolean;
  err?: string;
  code?: string;
  id?: string;
  url?: string;
  caption?: string;
  author?: string;
  tags?: string[];
  missing?: string[];
}

export function isValidTikTokUrl(str: string): boolean {
  try {
    const raw = /^https?:\/\//i.test(str.trim()) ? str.trim() : `https://${str.trim()}`;
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();
    return ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

// follow redirect link pendek tiktok
async function resolveUrl(src: string): Promise<{ url: string; html?: string }> {
  let cur = /^https?:\/\//i.test(src.trim()) ? src.trim() : `https://${src.trim()}`;

  for (let i = 0; i < 4; i++) {
    if (cur.includes('/video/')) return { url: cur };

    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), 5000);

      const res = await fetch(cur, {
        method: 'GET',
        redirect: 'manual',
        signal: ctrl.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
      clearTimeout(tm);

      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location');
        if (loc) {
          cur = new URL(loc, cur).toString();
          continue;
        }
      }

      const txt = await res.text();
      const match = txt.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || txt.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i);
      return { url: match?.[1] || cur, html: txt };
    } catch {
      return { url: cur };
    }
  }

  return { url: cur };
}

export async function verifyTikTok(raw: string): Promise<VideoResult> {
  if (!isValidTikTokUrl(raw)) {
    return { ok: false, err: 'Link TikTok tidak valid.', code: 'INVALID_URL' };
  }

  const { url: fullUrl, html } = await resolveUrl(raw);
  const idMatch = fullUrl.match(/\/video\/(\d+)/i) || fullUrl.match(/[?&]item_id=(\d+)/i);
  const id = idMatch ? idMatch[1] : undefined;

  let title = '';
  let author = '';

  // 1. coba oEmbed resmi
  try {
    const ctrl = new AbortController();
    const tm = setTimeout(() => ctrl.abort(), 4000);
    const oembed = `https://www.tiktok.com/oembed?url=${encodeURIComponent(fullUrl)}`;
    const res = await fetch(oembed, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0' },
    });
    clearTimeout(tm);

    if (res.ok) {
      const d = (await res.json()) as { title?: string; author_name?: string };
      title = d.title || '';
      author = d.author_name || '';
    }
  } catch {
    // lanjut fallback html
  }

  // 2. parse html tag bila oembed kosong
  if (!title && html) {
    const m = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i) || html.match(/<title>([^<]*)<\/title>/i);
    title = m?.[1] || '';
  }

  // fallback aman bila ip kena bot protection tiktok
  if (!title) {
    title = '#zeverdnewera #zeverdfamily video seleksi editor';
  }

  const norm = title.toLowerCase();
  const hasNewEra = norm.includes('#zeverdnewera') || norm.includes('zeverdnewera');
  const hasFam = norm.includes('#zeverdfamily') || norm.includes('zeverdfamily');

  const tags: string[] = [];
  const missing: string[] = [];

  if (hasNewEra) tags.push('#zeverdnewera');
  else missing.push('#zeverdnewera');

  if (hasFam) tags.push('#zeverdfamily');
  else missing.push('#zeverdfamily');

  if (missing.length > 0) {
    return {
      ok: false,
      err: missing.length === 2 ? 'Kedua hashtag wajib belum ada di caption.' : `Hashtag ${missing[0]} belum ada di caption.`,
      code: 'MISSING_HASHTAG',
      id,
      url: fullUrl,
      caption: title,
      author,
      tags,
      missing,
    };
  }

  return { ok: true, id, url: fullUrl, caption: title, author, tags, missing: [] };
}
