import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'flipthelense_super_secret_jwt_key_2026';

/**
 * Generate a signed JWT token with expiry
 */
export function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Express middleware to verify JWT authorization header
 */
export function requireAdminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied: Authentication token required.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired: Please log in again.' });
    }
    return res.status(403).json({ error: 'Access denied: Invalid authentication token.' });
  }
}
