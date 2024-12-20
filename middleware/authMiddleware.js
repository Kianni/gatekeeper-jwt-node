import jwt from 'jsonwebtoken';
import secretKey from '../config/secretKey.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey); 
    req.user = await User.findById(decoded.userId); // Fetch user details from the database
    next();
  } catch (error) {
    // console.log(error)
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;