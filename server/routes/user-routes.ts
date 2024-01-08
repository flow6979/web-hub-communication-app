import express from 'express';
import { allUsers, authUser, registerUser } from '../controllers/user-controllers';
import { protect } from '../middlewares/auth-middleware';

// Creating an instance of an Express router. 
const router = express.Router();

// router.route('/'): Specifies a route for the root path of the user resource. This is equivalent to /api/user.
router.route('/').post(registerUser).get(protect, allUsers);

// Specifies a route for the /login path under the user resource.
router.post('/login', authUser);

export default router;
