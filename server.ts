import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { checkSchema, CheckRes } from './src/lib/validate.ts';
import { verifyTikTok } from './src/lib/tiktok.ts';
import { checkRateLimit, isVidUsed, saveVid, verifyTurnstile } from './src/lib/security.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const WA_LINK = process.env.WA_GROUP_LINK || 'https://chat.whatsapp.com/GHYk8LpZeverdNewEraJoin';

app.use(express.json({ limit: '2kb' }));

app.post('/api/check', async (req: Request, res: Response<CheckRes>) => {
  const ct = req.headers['content-type'];
  if (!ct || !ct.includes('application/json')) {
    return res.status(400).json({ success: false, error: 'Format harus application/json.' });
  }

  // honeypot bot trap
  if (req.body.website && String(req.body.website).trim().length > 0) {
    return res.status(400).json({ success: false, error: 'Permintaan ditolak.' });
  }

  const fwd = req.headers['x-forwarded-for'];
  const ip = typeof fwd === 'string' ? fwd.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

  const lim = checkRateLimit(ip);
  if (!lim.ok) {
    return res.status(429).json({ success: false, error: `Terlalu banyak request. Tunggu ${lim.wait}d.` });
  }

  const chk = await verifyTurnstile(req.body.turnstileToken, ip);
  if (!chk.ok) {
    return res.status(400).json({ success: false, error: chk.err || 'Verifikasi captcha gagal.' });
  }

  const body = checkSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({ success: false, error: body.error.issues[0]?.message || 'Data tidak valid.' });
  }

  const { nama, link } = body.data;
  const vid = await verifyTikTok(link);

  if (!vid.ok) {
    return res.status(400).json({
      success: false,
      error: vid.err || 'Verifikasi video gagal.',
      code: vid.code,
      nama,
      videoId: vid.id,
      videoTitle: vid.caption,
      hashtagsFound: vid.tags,
      missingHashtags: vid.missing,
    });
  }

  const vidKey = vid.id || vid.url || link;
  if (isVidUsed(vidKey)) {
    return res.status(400).json({
      success: false,
      error: 'Video ini sudah pernah dipakai untuk pendaftaran.',
      nama,
      videoId: vid.id,
      videoTitle: vid.caption,
    });
  }

  saveVid(vidKey);

  return res.json({
    success: true,
    message: `Lolos, ${nama}.`,
    nama,
    videoId: vid.id,
    videoTitle: vid.caption,
    waLink: WA_LINK,
    hashtagsFound: vid.tags,
  });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const dist = path.resolve(__dirname, 'dist');
    app.use(express.static(dist));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0');
}

start();
