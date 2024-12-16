import { Router } from 'express';
import { loginUser } from '../services/auth.service';
import { asyncHandler } from '../middleware/async';

const router = Router();

router.post('/login', asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Missing credentials',
        message: 'Username and password are required'
      });
    }

    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'The username or password is incorrect'
      });
    } else {
      throw error; // Let the error handler deal with other errors
    }
  }
}));

export { router as authRouter };