## Arquitetura

### Visão Geral

- Web responsivo (Admin Portal) + App móvel complementar
- Backend em microserviços (API Gateway, Auth, Attendance, Face)
- Banco principal: PostgreSQL; Cache: Redis
- Cloud-native, multi-tenant, escalável, segura e auditável

### Componentes

- API Gateway (Node/TS): roteamento, autenticação JWT, rate limiting, auditoria
- Auth Service (Node/TS): identidades, perfis, papéis, tenants, SSO, MFA
- Attendance Service (FastAPI): controle de ponto, regras, jornadas, relatórios
- Face Service (FastAPI): reconhecimento facial, liveness, anti-spoofing
- Web Admin (React): gestão, dashboards, configurações e workflows

### Multi-tenant

- Isolamento por `tenant_id` em schema PostgreSQL ou por colunas segregadas
- Chaves de assinatura/cripto por tenant, segregação de dados e logs por tenant

### Segurança

- TLS, JWT, PEP/ABAC com escopos, logs imutáveis
- Segredos via variáveis de ambiente/secret store

### Observabilidade

- Logs estruturados, métricas, tracing distribuído (APM)

### Entrega & Infra

- Docker por serviço, orquestração via Kubernetes, CI/CD automatizado

