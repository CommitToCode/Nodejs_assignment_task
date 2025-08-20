const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadRoot = process.env.UPLOAD_DIR || 'uploads';
const profileDir = path.join(uploadRoot, 'profile');

if (!fs.existsSync(uploadRoot)) fs.mkdirSync(uploadRoot);
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg
    cb(null, `user_${req.user?.id || 'guest'}_${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ok = ['image/jpeg','image/png','image/webp'].includes(file.mimetype);
  cb(ok ? null : new Error('Only JPG/PNG/WEBP allowed'), ok);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

module.exports = upload;
