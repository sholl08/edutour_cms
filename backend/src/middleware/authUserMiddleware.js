const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    console.error('JWT error:', error);
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = authUser;