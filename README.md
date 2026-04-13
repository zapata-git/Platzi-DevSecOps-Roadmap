# Platzi DevSecOps Roadmap

Plataforma educativa interactiva que acompaña el **Roadmap de Seguridad y DevSecOps de Platzi**. Cada módulo del roadmap tiene su propia sección con explicaciones visuales, diagramas animados, ejemplos de código y herramientas prácticas — todo en el navegador, sin configuración adicional.

> **Stack:** React 19 · TypeScript · Vite · Framer Motion · Lucide Icons

---

## Tabla de contenidos

- [Demo y acceso](#demo-y-acceso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Módulos implementados](#módulos-implementados)
  - [Fundamentos de Criptografía](#1-fundamentos-de-criptografía)
  - [OWASP Top 10](#2-owasp-top-10)
  - [Ciberseguridad para Desarrollo Web](#3-ciberseguridad-para-desarrollo-web)
- [Roadmap de módulos](#roadmap-de-módulos)
- [Pipeline CI/CD](#pipeline-cicd)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
- [Contribuir](#contribuir)

---

## Demo y acceso

```bash
git clone https://github.com/zapata-git/Platzi-DevSecOps-Roadmap.git
cd Platzi-DevSecOps-Roadmap
npm install
npm run dev
# → http://localhost:4000
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/          # AppLayout, Navbar, Sidebar, CourseTabs
│   └── ui/              # Button, Card, Input, StepIndicator, Tooltip
├── data/
│   └── courses.ts       # Definición central de todos los módulos y topics
├── features/
│   ├── ciberseguridad-web/   # Módulo 3 — 6 tabs interactivos
│   ├── rsa/                  # Módulo 1 — RSA completo
│   ├── hash/                 # Módulo 1 — Hashing
│   ├── hmac/                 # Módulo 1 — HMAC
│   ├── aes/                  # Módulo 1 — AES
│   ├── ecc/                  # Módulo 1 — Curvas Elípticas
│   ├── pki/                  # Módulo 1 — PKI
│   ├── prng/                 # Módulo 1 — Números Aleatorios
│   └── sign/                 # Módulo 1 — Firmas Digitales
├── pages/
│   ├── CoursePage.tsx        # Router de tabs por módulo
│   ├── DiffieHellmanPage.tsx
│   ├── RsaPage.tsx
│   ├── OwaspPage.tsx
│   └── WelcomeDashboard.tsx
└── .github/
    └── workflows/
        └── ci.yml            # Pipeline CI/CD — 3 jobs
```

---

## Módulos implementados

### 1. Fundamentos de Criptografía

> Visualiza los algoritmos criptográficos desde cero — matemáticas aplicadas con simulaciones interactivas en el navegador.

| Tab | Descripción |
|-----|-------------|
| **Diffie-Hellman** | Simulación paso a paso del intercambio de claves. Alice y Bob generan un secreto compartido sin transmitirlo. |
| **Algoritmo RSA** | Generación de claves, cifrado y descifrado interactivo. Diagrama visual del flujo completo. |
| **Hashing** | Playground de SHA-256/SHA-512. Demuestra avalanche effect y por qué los hashes son unidireccionales. |
| **HMAC** | Autenticación de mensajes con clave secreta. Diferencia entre hash simple y HMAC firmado. |
| **AES Cifrado** | Cifrado simétrico AES-GCM en el navegador usando Web Crypto API. |
| **Números Aleatorios** | PRNG vs CSPRNG. Importancia de la aleatoriedad segura en criptografía. |
| **Firmas Digitales** | Firma y verificación con ECDSA. Garantía de integridad y no repudio. |
| **Curvas Elípticas** | Visualización interactiva de operaciones sobre curvas elípticas (ECC). |
| **PKI y Certificados** | Infraestructura de clave pública, cadena de confianza y certificados X.509. |

**Tecnologías:** Web Crypto API nativa del navegador — sin librerías externas de criptografía.

---

### 2. OWASP Top 10

> Los 10 riesgos más críticos de seguridad en aplicaciones web, con ejemplos de código vulnerable vs. seguro.

| Tab | Riesgo |
|-----|--------|
| **A01** | Broken Access Control — control de acceso mal configurado |
| **A02** | Cryptographic Failures — datos sensibles expuestos |
| **A03** | Injection — SQL, NoSQL, OS injection |
| **A04** | Insecure Design — fallas en el diseño de la arquitectura |
| **A05** | Security Misconfiguration — configuraciones por defecto inseguras |
| **A06** | Vulnerable Components — dependencias desactualizadas con CVEs |
| **A07** | Authentication Failures — sesiones y credenciales mal gestionadas |
| **A08** | Integrity Failures — deserialización insegura |
| **A09** | Logging & Monitoring Failures — sin trazabilidad |
| **A10** | SSRF — Server-Side Request Forgery |

---

### 3. Ciberseguridad para Desarrollo Web

> El módulo más completo. Cubre desde el factor humano hasta la implementación de un pipeline de seguridad real con GitHub Actions.

---

#### Tab 1 — El Factor Humano

El mayor vector de ataque no es técnico: es el comportamiento humano.

**Contenido:**
- Qué es Social Engineering y cómo opera
- Caso real: ataque a Payoneer Argentina (2024) via SMS falsos de Movistar
- El proyecto del módulo: sistema de métricas de commits para engineering managers
- Habilidades que se aplican: validación de inputs, manejo de credenciales, IAM, GitHub Actions, Terraform, Observabilidad

---

#### Tab 2 — IAM y Triple A

Gestión de identidad y acceso en AWS. La base de toda operación segura en la nube.

**Conceptos:**
| Principio | Pregunta | Implementación |
|-----------|----------|----------------|
| **Autenticación** | ¿Quién eres? | Usuario + contraseña, MFA |
| **Autorización** | ¿Qué puedes hacer? | Policies IAM, roles |
| **Accountability** | ¿Qué hiciste? | CloudTrail, logs auditables |

**Guía práctica:**
- Crear cuenta AWS y usuario administrador en IAM
- Adjuntar policy `AdministratorAccess` — JSON con `Allow */*`
- Activar MFA para root con Authy o Google Authenticator
- Configurar Account Alias para reemplazar el Account ID numérico
- Regla de oro: **root solo para tareas críticas**

**Herramientas:** AWS IAM · AWS CloudTrail · Bitwarden / LastPass

---

#### Tab 3 — Backend Go + Webhooks

Construye una API REST en Go que recibe eventos de GitHub en tiempo real.

**Stack:**
- `gorilla/mux` como router HTTP
- `go mod` para gestión de dependencias con vendor
- `ngrok` para exponer localhost al internet durante desarrollo

**Flujo del webhook:**
```
git push → GitHub detecta evento → POST a ngrok URL → API Go procesa → head_commit extraído
```

**Datos extraídos de `head_commit`:**
```json
{
  "id":        "hash del commit",
  "timestamp": "fecha y hora exacta",
  "author":    { "name": "...", "email": "..." },
  "message":   "mensaje del commit",
  "modified":  ["archivos cambiados"]
}
```

**Configuración del webhook en GitHub:**
- Payload URL: `<ngrok-url>/hello`
- Content type: `application/json`
- SSL verification: habilitada
- Evento: `push`

**Recursos:** [platzi/Software-seguro](https://github.com/platzi/Software-seguro) · [ngrok.com](https://ngrok.com)

---

#### Tab 4 — Mocks y Testing

Testing desacoplado de infraestructura real. Principio de Dependency Inversion aplicado.

**Concepto central:**
> Tu lógica de negocio nunca depende de una implementación concreta (BD, API). Siempre depende de una **interfaz** — eso permite mockear en tests y cambiar de base de datos sin tocar la lógica.

**Con Testify/mock en Go:**
```bash
go get github.com/stretchr/testify/mock
```

**Patrón:**
```
Lógica de negocio → Interfaz → Mock (tests) / BD real (producción)
```

**Helpers clave:**
| Helper | Descripción |
|--------|-------------|
| `m.Called(ctx, args)` | Registra la llamada y valida argumentos |
| `args.Error(0)` | Extrae el valor de tipo `error` en el índice 0 |
| `args.Get(0).(T)` | Extrae cualquier valor y lo castea al tipo esperado |

**Por qué mejora la seguridad:** código testeable detecta bugs antes de producción, reduce superficie de ataque y valida el manejo de errores críticos.

---

#### Tab 5 — DevSecOps

La cultura que integra seguridad en cada fase del ciclo de desarrollo.

**El ciclo ∞:**

```
        ┌─── Dev Loop ───┐         ┌─── Ops Loop ───┐
        │                │         │                │
      Code            Release ── Deploy          Monitor
      Build    ──── PLAN ────  Operate    ──────  │
      Test             │         │                │
        │              └─────────┘                │
        └──────────────────────────────────────────┘
```

| Fase | Práctica de Seguridad |
|------|----------------------|
| Code | Code Review, Static Analysis (SAST) |
| Build | Dependency Check, firma de artefactos |
| Test | Penetration Testing, DAST |
| Release | Compliance Validation |
| Deploy | Audit, Config Hardening |
| Operate | Monitor, Detect |
| Monitor | Response, Recover, Threat Intelligence |

**4 técnicas al alcance del desarrollador:**
1. **Threat Modeling** — STRIDE framework, OWASP Threat Dragon
2. **Threat Intelligence** — CVE Database, GitHub Security Advisories, Dependabot
3. **Approval Gates** — Branch Protection Rules, required status checks
4. **Pruebas Automatizadas** — la herramienta más accesible y de mayor impacto

---

#### Tab 6 — GitHub Actions

El pipeline que une todo el módulo. Automatización de seguridad sin servidores externos.

**Anatomía de un workflow:**
```yaml
name: CI                        # nombre visible en GitHub
on: [push, pull_request]        # cuándo corre
jobs:                           # grupos de pasos
  test:
    runs-on: ubuntu-latest      # entorno de ejecución
    steps:
      - uses: actions/checkout@v4   # reutiliza una action
      - run: npm test               # comando de terminal
```

**3 niveles de complejidad:**

| Nivel | Descripción | Cuándo usarlo |
|-------|-------------|---------------|
| **1** | `npm test` en cada push — 10 líneas | Empezar hoy |
| **2** | PR protection + cobertura mínima + audit | Proyectos en equipo |
| **3** | Jobs paralelos (tests + security) + deploy condicional | Producción |

**Casos de uso de seguridad:**
- Escaneo de secretos con `gitleaks`
- Audit de dependencias con `npm audit` / `nancy`
- Análisis estático (SAST) con `CodeQL` / `gosec`
- Deploy seguro via OIDC con IAM (sin secrets estáticos)
- CODEOWNERS para proteger archivos críticos

---

## Roadmap de módulos

| # | Módulo | Estado |
|---|--------|--------|
| 1 | Fundamentos de Criptografía | ✅ Implementado |
| 2 | OWASP Top 10: Riesgos en Aplicaciones | ✅ Implementado |
| 3 | Ciberseguridad para Desarrollo Web | ✅ Implementado |
| 4 | OAuth 2.0 y OpenID Connect | 🔜 Próximo |
| 5 | Auth0: Implementación de Autenticación | 🔜 Próximo |
| 6 | Secretos Ocultos de JavaScript | 🔜 Próximo |
| 7 | Next.js: Seguridad Web con OWASP | 🔜 Próximo |
| 8 | Next.js: Autenticación | 🔜 Próximo |
| 9 | Backend con Node.js: Passport.js y JWT | 🔜 Próximo |
| 10 | NestJS: Autenticación con Passport y JWT | 🔜 Próximo |
| 11 | Autenticación con Angular | 🔜 Próximo |
| 12 | Java Spring Security | 🔜 Próximo |

---

## Pipeline CI/CD

El proyecto usa GitHub Actions con 3 jobs que corren en cada PR y push a `main`:

```
PR abierto
    │
    ├── quality (TypeScript + ESLint)
    │       │
    │       ▼
    ├── build (producción + artefacto)   ← necesita quality
    │
    └── security (npm audit CVEs)        ← corre en paralelo
```

**Archivo:** `.github/workflows/ci.yml`

| Job | Qué valida | Falla si... |
|-----|-----------|-------------|
| `quality` | TypeScript types + ESLint | Hay errores de tipo o lint |
| `build` | Compilación para producción | El build de Vite falla |
| `security` | CVEs en dependencias | Hay vulnerabilidades `high` o `critical` |

El merge a `main` queda bloqueado si cualquier job falla.

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev          # → http://localhost:4000

# Verificar TypeScript
npx tsc --noEmit

# Lint
npm run lint

# Build de producción
npm run build

# Audit de seguridad
npm audit
```

**Requisitos:** Node.js 20+ · npm 10+

---

## Contribuir

1. Fork del repositorio
2. Crea una rama: `git checkout -b feat/nombre-modulo`
3. Agrega el topic en `src/data/courses.ts`
4. Crea el componente en `src/features/<modulo>/`
5. Registra la ruta en `src/pages/CoursePage.tsx`
6. Asegúrate de que el pipeline pase: `npm run build && npm run lint`
7. Abre un Pull Request — el CI valida automáticamente

---

*Construido siguiendo el Roadmap de Seguridad de [Platzi](https://platzi.com)*
