## APIs (Esqueleto)

### API Gateway
- `GET /health` — saúde
- Encaminha requisições para serviços internos com verificação JWT

### Auth Service
- `POST /auth/login` — autenticação e emissão de JWT
- `GET /health` — saúde

### Attendance Service
- `POST /attendance/punch` — registro de ponto (placeholder)
- `GET /health` — saúde

### Face Service
- `POST /face/enroll` — cadastro biométrico (placeholder)
- `POST /face/verify` — verificação com liveness (placeholder)
- `GET /health` — saúde

