import jwt from 'jsonwebtoken';
import { CustomError } from '../utills/customError.js';
import { User } from '../Models/user.model.js';

export const requireAuth = async (req, res, next) => {
  try {
    let userToken;

    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (authHeader && authHeader.startsWith('Bearer')) {
      userToken = authHeader.split(' ')[1];
    }

    if (!userToken) {
      return next(new CustomError('Please log in to access this feature', 401));
    }

    try {
      const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
      
      const currentUser = await User.findById(decodedToken.userId);
      if (!currentUser) {
        return next(new CustomError('User no longer exists', 401));
      }

      req.user = {
        userId: currentUser._id,
        emailAddress: currentUser.emailAddress
      };
      
      next();
    } catch (error) {
      return next(new CustomError('Invalid token. Please log in again', 401));
    }
  } catch (error) {
    next(error);
  }
};