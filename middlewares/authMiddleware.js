const jwt = require('jsonwebtoken')
require('dotenv').config()

// **JWT Authentication Middleware**
const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.token // Read token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token' })
    }

    req.user = decoded // Attach user data to request

    next()
  })
}

// **Admin Authorization Middleware**
const authorizeAdmin = (req, res, next) => {
  const token = req.cookies?.token // Read token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token' })
    }

    req.user = decoded // Attach user data to request

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Denied - Admins Only' })
    }
    next()
  })
}

module.exports = { authenticateJWT, authorizeAdmin }
