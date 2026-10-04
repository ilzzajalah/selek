import { z } from 'zod';

export const nameRegex = /^[a-zA-Z0-9 ._-]+$/;

export const checkSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 karakter.').max(50, 'Nama maksimal 50 karakter.').regex(nameRegex, 'Gunakan huruf, angka, atau spasi.'),
  link: z.string().trim().min(10, 'Link TikTok tidak valid.').max(300, 'Link terlalu panjang.'),
  turnstileToken: z.string().optional(),
  website: z.string().max(0).optional().or(z.literal('')),
});

export interface CheckRes {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  nama?: string;
  videoId?: string;
  videoTitle?: string;
  waLink?: string;
  hashtagsFound?: string[];
  missingHashtags?: string[];
}
