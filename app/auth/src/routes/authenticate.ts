import express from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const router = express.Router();

router.get('/api/users/authenticate', (req, res) => {
  console.log('called');
  if (!req.session?.jwt) {
    return res.status(401).send();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    res.append('user-id', payload.id);
    res.append('user-role', payload.role);
    return res.status(200).send();
  } catch (error) {
    return res.status(401).send({});
  }
});

export { router as authenticateRouter };
