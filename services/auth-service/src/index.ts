import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { SignJWT } from 'jose';

const app = express();
const port = Number(process.env.PORT || 8081);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/auth/login', async (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: 'invalid_credentials' });
  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (!privateKey) return res.status(500).json({ error: 'jwt_not_configured' });
  const jwt = await new SignJWT({ sub: username, scope: 'user', tenant: 'demo' })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(await import('jose').then(j => j.importPKCS8(privateKey, 'RS256')));
  res.json({ token: jwt });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth Service listening on port ${port}`);
});

