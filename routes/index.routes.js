const express = require('express');
const router = express.Router();
const multer = require('multer');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');


const upload = multer({ storage: multer.memoryStorage() });

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

  const filePath = `${userId}/${Date.now()}_${file.originalname}`;

  const { error } = await supabase
    .storage
    .from('drive-files')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype
    });

  if (error) {
    return res.status(500).json({ message: 'Upload failed. Please retry.' });
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

  const cleanName = filename.replace(/^\d+_/, '');

  res.setHeader('Content-Disposition', `attachment; filename="${cleanName}"`);
  res.setHeader('Content-Type', data.type || 'application/octet-stream');
  res.send(buffer);
});

module.exports = router;
