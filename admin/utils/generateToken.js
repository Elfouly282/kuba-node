const jwt = require('jsonwebtoken');

// Compress MongoDB ObjectId (24-char hex) → 16-char base64url
const compressId = (id) => {
  if (!id) return id;
  const hex = id.toString();
  if (hex.length !== 24) return hex;
  return Buffer.from(hex, 'hex').toString('base64url');
};

// Decompress 16-char base64url → 24-char hex ObjectId string
const decompressId = (id) => {
  if (!id) return id;
  if (id.length === 16) return Buffer.from(id, 'base64url').toString('hex');
  return id;
};

const generateToken = (payload) => {
  const compressed = { ...payload };
  if (compressed.id) compressed.id = compressId(compressed.id);
  if (compressed.uid) compressed.uid = compressId(compressed.uid);

  return jwt.sign(
    compressed,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = { generateToken, decompressId };
