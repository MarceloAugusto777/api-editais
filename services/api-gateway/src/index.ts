import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

// Simple in-memory JWKS via env public key (PEM), falling back to env string for demo
const publicKeyPem = process.env.JWT_PUBLIC_KEY;

async function verifyJwt(token: string): Promise<JWTPayload> {
  if (!publicKeyPem) {
    throw new Error('JWT_PUBLIC_KEY not configured');
  }
  const { payload } = await jwtVerify(token, await import('jose').then(j => j.importSPKI(publicKeyPem, 'RS256')));
  return payload;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
  if (!token) return res.status(401).json({ error: 'missing_token' });
  verifyJwt(token)
    .then(payload => {
      (req as any).user = payload;
      next();
    })
    .catch(() => res.status(401).json({ error: 'invalid_token' }));
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example protected proxy route (placeholder)
app.get('/v1/protected', authMiddleware, (req, res) => {
  res.json({ ok: true, user: (req as any).user });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API Gateway listening on port ${port}`);
});

