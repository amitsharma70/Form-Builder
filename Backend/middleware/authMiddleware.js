const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Adjust the path as necessary

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    console.log("hi");
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
  
        // Decode token to get user I D
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID and attach it to the request object
        req.user = await User.findById(decoded.id).select('-password');
         console.log(req.user.id);
      
        
        if (!req.user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });

  //is admin function

  const admin = asyncHandler(async (req, res, next) => {
    const {email}=req.user;
    const adminuser= await User.findOne({email});
    if (adminuser.role!=='admin') {
      res.status(403);
      throw new Error('Not authorized as an admin');
    } else {
      next();
    }
  });
  
  
  module.exports = { authMiddleware ,admin};