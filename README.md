# 🧾 Invoice Service Microservices

Projeto de estudo focado em **arquitetura de microserviços**, com ênfase em **mensageria, observabilidade e infraestrutura como código (IaC)**.

⚠️ **Nota de escopo**  
Este projeto **não tem foco em DDD ou Clean Architecture**.  
A estrutura das APIs foi mantida **simples e direta com Fastify**, pois o objetivo principal foi **treinar microserviços, comunicação assíncrona, telemetria distribuída e provisionamento de infraestrutura na AWS**.

---

## 🎯 Objetivos

- Comunicação assíncrona entre microserviços
- Mensageria com RabbitMQ
- Observabilidade distribuída com OpenTelemetry
- Deploy em AWS ECS Fargate
- Infraestrutura como código com Pulumi
- API Gateway centralizado

---

## 🧩 Microserviços

### 📦 app-orders
- **Porta**: 3333
- **Responsabilidades**:
  - Criar pedidos
  - Persistir dados no PostgreSQL
  - Publicar eventos no RabbitMQ

**Tecnologias**
- Fastify
- TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- RabbitMQ (producer)
- Zod
- OpenTelemetry

**Endpoints**
- GET /health
- POST /orders

---

### 🧾 app-invoices
- **Porta**: 3334
- **Responsabilidades**:
  - Consumir eventos do RabbitMQ
  - Processar pedidos
  - Gerar faturas

**Tecnologias**
- Fastify
- TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- RabbitMQ (consumer)
- OpenTelemetry

**Endpoints**
- GET /health

---

## 📨 Mensageria

- **Broker**: RabbitMQ
- **Fila**: orders

**Fluxo**
- app-orders → producer
- app-invoices → consumer

---

## 🌐 API Gateway

### 🚪 Kong
- Configuração declarativa via YAML
- Centraliza o acesso aos microserviços

**Rotas**
- /orders → app-orders
- /invoices → app-invoices

**Plugins**
- CORS habilitado

---

## ☁️ Infraestrutura (AWS)

Provisionada via **Pulumi (TypeScript)**.

### 🚀 ECS Fargate
- Serviços:
  - orders-service
  - rabbitmq-service
  - kong-service
- CPU: 256
- Memória: 512 MB

### ⚖️ Load Balancers
- **Application Load Balancer (ALB)**
  - HTTP / HTTPS
  - Exposição do Kong, Orders e interfaces administrativas
- **Network Load Balancer (NLB)**
  - TCP para RabbitMQ (AMQP)

### 🧱 Outros recursos
- VPC dedicada
- Subnets públicas
- ECR para imagens Docker

---

## 📊 Observabilidade

### 🔍 OpenTelemetry
- Instrumentações:
  - HTTP
  - Fastify
  - PostgreSQL
  - RabbitMQ
- Exportação via OTLP
- Traces enviados para Grafana Cloud

### 🧪 Ambiente local
- Jaeger (all-in-one)
- UI: http://localhost:16686

---

## 🐳 Ambiente Local

Utiliza Docker Compose para desenvolvimento e testes locais.

**Serviços**
- RabbitMQ (management)
- Jaeger
- Kong

---

## 🔄 Fluxo de Dados

Cliente  
→ Kong API Gateway  
→ Orders Service  
→ PostgreSQL  
→ RabbitMQ  
→ Invoices Service  
→ PostgreSQL  

---

## 🧠 Considerações Finais

Este projeto foi desenvolvido com foco em **prática técnica real**, lidando com:

- comunicação entre microserviços
- mensageria assíncrona
- observabilidade distribuída
- infraestrutura na AWS
- deploy em containers

A prioridade foi **integrar tecnologias e entender o funcionamento do sistema como um todo**, não construir uma arquitetura acadêmica.
