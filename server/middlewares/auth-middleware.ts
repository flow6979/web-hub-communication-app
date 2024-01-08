import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from 'express';
import { User } from '../models/user-model';

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
	// req.hearers.authorization sample -> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..

    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Extract the token from the Authorization header
        token = req.headers.authorization.split(' ')[1];

        // Verify the token using the JWT_SECRET stored in the environment variables
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        // Retrieve the user from the database using the decoded user ID and exclude the password field
        req.user = await User.findById(decoded.id).select('-password');

        // Call the next middleware or route handler
        next();
      } catch (error) {
        // If an error occurs during token verification, handle it
        res.status(401);
        throw new Error('Not Authorized, token Failed!');
      }
    }

    // If no token is provided
    if (!token) {
      res.status(401);
      throw new Error('Not Authorized, no Token!');
    }
  },
);
