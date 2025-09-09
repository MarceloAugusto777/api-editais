# Sistema de Ponto Eletrônico com Reconhecimento Facial (Gov-Ready)

Este repositório contém o monorepo de um sistema de ponto eletrônico com reconhecimento facial, projetado para órgãos públicos brasileiros, com foco em conformidade (Portaria 1.510/2009, LGPD), segurança, escalabilidade e multi-tenant.

## Estrutura do Repositório

- `apps/` — Aplicações frontend (ex.: Web Admin)
- `services/` — Microserviços backend (API Gateway, Auth, Attendance, Face)
- `infra/` — Infraestrutura (Docker, Kubernetes, IaC)
- `docs/` — Documentação (Arquitetura, Compliance, APIs)

## Requisitos de Desenvolvimento

- Node.js 20+
- Python 3.11+
- Docker 24+ e Docker Compose

## Executando (visão geral)

1. Configure variáveis de ambiente em `infra/docker/.env` (copie de `.env.example`).
2. Suba os serviços de infraestrutura e microserviços:

```bash
docker compose -f infra/docker/docker-compose.yml up -d --build
```

3. Serviços esperados (portas padrão):
   - API Gateway: `http://localhost:8080/health`
   - Auth Service: `http://localhost:8081/health`
   - Attendance Service: `http://localhost:8001/health`
   - Face Service: `http://localhost:8002/health`
   - PostgreSQL: `localhost:5432`
   - Redis: `localhost:6379`

## Conformidade e Segurança

- LGPD: Minimização de dados, consentimento explícito, direito ao esquecimento, auditoria e trilha de acesso.
- Portaria 1.510/2009: Diretrizes de imutabilidade de registros, assinaturas digitais e relatórios.
- Segurança: JWT, criptografia em trânsito, logs auditáveis, segregação por tenant.

Mais detalhes em `docs/architecture.md` e `docs/compliance.md`.

## Licitação e Entregáveis

Ver `docs/architecture.md` (visão geral), `docs/compliance.md` (conformidade) e `docs/apis.md` (APIs). Planos de implantação, manuais e runbooks serão detalhados conforme evolução.

