const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    res.status(401).json({ error: 'Vous devez être connecté pour accéder à cette ressource.' });
  } else {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Token invalide.' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

function generateToken(userId) {
  return jwt.sign({ userId }, 'secret', { expiresIn: '1h' });
}

module.exports = {
  authenticate,
  generateToken
};
