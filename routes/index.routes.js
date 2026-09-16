const express = require('express');
const router = express.Router();
const multer = require('multer');
const { randomUUID } = require('crypto');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');


const MAX_FILE_SIZE = 50 * 1024 * 1024;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE }
});

function sanitizeFilename(filename) {
  const safeName = filename
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 _.'!,*&$@=;:+?()\-]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();

  return (safeName || 'file').slice(0, 180);
}

router.get('/home', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  const { data, error } = await supabase
    .storage
    .from('drive-files')
    .list(userId);

  const files = data || [];

  res.render('home', {
    files,
    username: req.user.username,
    userId: userId,
    loadError: error ? 'Files could not be loaded. Please retry.' : null
  });
});


router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  const userId = req.user.userId;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Choose a file and retry.' });
  }

  const storedFilename = `${randomUUID()}_${sanitizeFilename(file.originalname)}`;
  const filePath = `${userId}/${storedFilename}`;

  const { error } = await supabase
    .storage
    .from('drive-files')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype || 'application/octet-stream'
    });

  if (error) {
    console.error('Supabase upload failed:', {
      name: error.name,
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
      storageError: error.error,
      fileSize: file.size,
      mimeType: file.mimetype
    });

    const isTooLarge = error.status === 413 ||
      error.statusCode === 413 ||
      /too large|exceeds.*limit/i.test(error.message || '');

    return res.status(isTooLarge ? 413 : 500).json({
      message: isTooLarge
        ? 'This file is too large. The maximum size is 50 MB.'
        : 'Upload failed in cloud storage. Please retry.'
    });
  }

  if (req.get('accept')?.includes('application/json')) {
    return res.json({ redirect: '/home' });
  }
  res.redirect('/home');
});


router.get('/download/:userId/:filename', authMiddleware, async (req, res) => {
  const { userId, filename } = req.params;

  if (userId !== req.user.userId.toString()) {
    return res.status(403).json({ message: 'You cannot download this file.' });
  }

  const filePath = `${userId}/${filename}`;

  const { data, error } = await supabase
    .storage
    .from('drive-files')
    .download(filePath);

  if (error) {
    return res.status(500).json({ message: 'Download failed. Please retry.' });
  }

  const buffer = Buffer.from(await data.arrayBuffer());

  const cleanName = filename.replace(/^(?:\d+|[0-9a-f-]{36})_/, '');

  res.setHeader('Content-Disposition', `attachment; filename="${cleanName}"`);
  res.setHeader('Content-Type', data.type || 'application/octet-stream');
  res.send(buffer);
});

module.exports = router;
