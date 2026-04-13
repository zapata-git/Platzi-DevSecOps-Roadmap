import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import {
  Play,
  ShieldCheck,
  GitMerge,
  Webhook,
  FlaskConical,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ code, label }: { code: string; label?: string }) => (
  <div>
    {label && (
      <p style={{ margin: '0 0 0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </p>
    )}
    <pre style={{
      margin: 0, padding: '1rem', backgroundColor: 'var(--panel-bg)',
      borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
      fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)',
      overflowX: 'auto', lineHeight: 1.7, whiteSpace: 'pre'
    }}>{code}</pre>
  </div>
);

function Collapsible({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 1rem', backgroundColor: 'var(--panel-bg)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}
      >
        <span>📎 {label}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-color)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// Conexiones con módulos anteriores
const moduleLinks = [
  {
    icon: ShieldCheck,
    color: '#3b82f6',
    module: 'IAM y Triple A',
    relation: 'GitHub Actions usa credenciales de AWS IAM para deployar de forma segura. Con OIDC puedes conectar el pipeline a AWS sin guardar secrets hardcodeados.',
    action: 'Configure AWS credentials con rol IAM específico para CI/CD — mínimo privilegio.',
    example: `- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/GitHubActions
    aws-region: us-east-1
# Sin access keys. Sin secrets expuestos.`,
  },
  {
    icon: Webhook,
    color: '#8b5cf6',
    module: 'Backend Go + Webhooks',
    relation: 'El mismo código Go que recibe webhooks de GitHub puede testearse y desplegarse automáticamente con Actions cada vez que haces push a main.',
    action: 'Pipeline que buildea, testea y despliega la API Go en cada PR.',
    example: `- name: Build Go API
  run: go build ./...

- name: Run tests
  run: go test ./...

- name: Deploy si pasa todo
  run: ./deploy.sh`,
  },
  {
    icon: FlaskConical,
    color: '#10b981',
    module: 'Mocks y Testing',
    relation: 'Los mocks que escribiste con Testify se ejecutan automáticamente en el pipeline. Si el mock de la BD falla, el merge queda bloqueado antes de llegar a producción.',
    action: 'Status check requerido: todos los tests con mocks deben pasar para mergear.',
    example: `- name: Run tests con mocks
  run: go test -v -race ./...

- name: Cobertura mínima
  run: |
    go test -coverprofile=coverage.out ./...
    go tool cover -func=coverage.out`,
  },
  {
    icon: Lock,
    color: '#f59e0b',
    module: 'DevSecOps',
    relation: 'GitHub Actions es la herramienta concreta que implementa la cultura DevSecOps: los approval gates, el ciclo CI/CD y las pruebas automatizadas viven aquí.',
    action: 'Actions como pipeline central que une Dev y Ops con seguridad en cada paso.',
    example: `# Audit de dependencias vulnerables
- name: Security audit
  run: |
    go list -json -deps ./... | nancy sleuth
    # bloquea si hay CVEs conocidas`,
  },
];

const useCases = [
  { emoji: '🔍', title: 'Escaneo de secretos', desc: 'Detecta API keys o tokens accidentalmente commiteados antes de que lleguen al repo remoto.', tool: 'gitleaks / trufflehog' },
  { emoji: '📦', title: 'Audit de dependencias', desc: 'Analiza automáticamente si alguna librería tiene vulnerabilidades conocidas (CVEs).', tool: 'npm audit / go nancy / Dependabot' },
  { emoji: '🧪', title: 'Tests automatizados', desc: 'Corre todos los tests (unitarios, integración, mocks) en cada PR. Merge bloqueado si alguno falla.', tool: 'Testify / Jest / pytest' },
  { emoji: '🔒', title: 'Análisis estático (SAST)', desc: 'Revisa el código fuente en busca de patrones inseguros: SQL injection, XSS, inputs sin validar.', tool: 'CodeQL / gosec / semgrep' },
  { emoji: '🚀', title: 'Deploy seguro', desc: 'Solo despliega si el pipeline completo pasó. Usa OIDC con IAM en vez de secrets estáticos.', tool: 'aws-actions / OIDC federation' },
  { emoji: '📋', title: 'Revisión de código', desc: 'CODEOWNERS asegura que ciertos archivos críticos (auth, pagos, config) requieran revisión específica.', tool: 'CODEOWNERS + branch protection' },
];

export function GithubActionsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.08) 0%, rgba(var(--secondary-rgb),0.08) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)', padding: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ padding: '0.9rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
            <Play size={36} />
          </div>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.8rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GitHub Actions en Ciberseguridad
            </h2>
            <p style={{ margin: '0 0 0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              GitHub Actions no es solo automatización — es tu <strong style={{ color: 'var(--text-primary)' }}>primera línea de defensa</strong> antes de que cualquier código llegue a producción.
              Conecta todo lo que aprendiste en este módulo en un solo pipeline.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['CI/CD', 'Approval Gates', 'SAST', 'Dependency Audit', 'OIDC + IAM'].map(tag => (
                <span key={tag} style={{ padding: '0.2rem 0.6rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', border: '1px solid rgba(var(--primary-rgb),0.25)', borderRadius: '999px', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Para qué sirve en seguridad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>¿Para qué usar GitHub Actions en ciberseguridad?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {useCases.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div style={{ padding: '0.9rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <p style={{ margin: 0, fontSize: '1.4rem' }}>{item.emoji}</p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
                <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'rgba(var(--secondary-rgb),0.1)', border: '1px solid rgba(var(--secondary-rgb),0.2)', borderRadius: '999px', fontSize: '0.72rem', color: 'var(--secondary)', alignSelf: 'flex-start' }}>{item.tool}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Configurar un .yml para pruebas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Play size={18} color="var(--primary)" /> Configurar un workflow de pruebas — es más fácil de lo que parece
        </h3>

        <Card style={{ background: 'rgba(var(--secondary-rgb),0.05)', border: '1px solid rgba(var(--secondary-rgb),0.2)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>📁</span>
            <div>
              <p style={{ margin: '0 0 0.3rem', fontWeight: 700 }}>Solo necesitas un archivo en tu repo</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Crea la carpeta <code>.github/workflows/</code> en la raíz de tu proyecto y agrega un archivo <code>.yml</code>.
                GitHub lo detecta automáticamente — no hay nada que instalar ni configurar aparte.
              </p>
            </div>
          </div>

          {/* Anatomía del yml */}
          <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>Anatomía de un workflow — qué hace cada parte</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[
              { key: 'name:',     color: '#a78bfa', desc: 'Nombre que aparece en la pestaña Actions de GitHub' },
              { key: 'on:',       color: '#3b82f6', desc: 'Cuándo corre — push, pull_request, schedule, manual...' },
              { key: 'jobs:',     color: '#10b981', desc: 'Grupos de pasos. Pueden correr en paralelo o en secuencia' },
              { key: 'runs-on:', color: '#f59e0b', desc: 'El OS del runner — ubuntu-latest es el más común y gratis' },
              { key: 'steps:',    color: '#ec4899', desc: 'Lista de comandos o actions a ejecutar en orden' },
              { key: 'uses:',     color: '#06b6d4', desc: 'Reutiliza una action publicada (checkout, setup-go, etc.)' },
              { key: 'run:',      color: '#f97316', desc: 'Comando de terminal — cualquier cosa que correrías en bash' },
            ].map(r => (
              <div key={r.key} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.4rem 0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <code style={{ color: r.color, fontWeight: 700, minWidth: '90px', fontSize: '0.82rem' }}>{r.key}</code>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.83rem' }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* 3 niveles de complejidad */}
          <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>3 niveles — empieza simple, escala según necesites</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

            <Collapsible label="Nivel 1 — Mínimo viable: correr tests en cada push">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  El workflow más simple posible. 10 líneas. Corre tus tests cada vez que alguien hace push.
                  Si un test falla, GitHub lo muestra en rojo en el commit.
                </p>
                <CodeBlock label=".github/workflows/tests.yml" code={`name: Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: go test ./...        # o: npm test / pytest / etc.`} />
              </div>
            </Collapsible>

            <Collapsible label="Nivel 2 — PR protection: bloquear merge si los tests fallan">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Solo corre en PRs hacia <code>main</code>. Agrega cobertura mínima y audit de dependencias.
                  Configura el job como <em>required status check</em> en Branch Protection para que el merge quede bloqueado.
                </p>
                <CodeBlock label=".github/workflows/pr-checks.yml" code={`name: PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: Install dependencies
        run: go mod download

      - name: Run tests con cobertura
        run: go test -coverprofile=cov.out ./...

      - name: Verificar cobertura mínima (70%)
        run: |
          COVERAGE=$(go tool cover -func=cov.out | grep total | awk '{print $3}' | tr -d '%')
          echo "Cobertura: $COVERAGE%"
          [ $(echo "$COVERAGE >= 70" | bc) -eq 1 ] || (echo "❌ Cobertura insuficiente" && exit 1)

      - name: Audit de dependencias
        run: go list -json -deps ./... | nancy sleuth`} />
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(var(--primary-rgb),0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--primary-rgb),0.18)' }}>
                  <p style={{ margin: '0 0 0.3rem', fontWeight: 700, fontSize: '0.85rem' }}>⚙️ Activar en GitHub</p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.5 }}>
                    Settings → Branches → main → Add branch protection rule →
                    activa <strong>"Require status checks to pass"</strong> → selecciona el job <code>test</code>.
                  </p>
                </div>
              </div>
            </Collapsible>

            <Collapsible label="Nivel 3 — Pipeline completo: tests + seguridad + deploy">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Múltiples jobs en paralelo: uno para tests, otro para seguridad. El deploy solo ocurre si ambos pasan
                  y el código llegó a <code>main</code>.
                </p>
                <CodeBlock label=".github/workflows/full-pipeline.yml" code={`name: Full Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  # Job 1: Tests (corre en paralelo con security)
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.22' }
      - run: go test -race -coverprofile=cov.out ./...
      - run: go tool cover -func=cov.out

  # Job 2: Seguridad (corre en paralelo con test)
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Scan de secretos
        uses: gitleaks/gitleaks-action@v2
      - name: Análisis estático
        uses: securego/gosec@master
        with: { args: ./... }

  # Job 3: Deploy — solo si test Y security pasaron
  deploy:
    needs: [test, security]         # depende de ambos jobs
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: echo "Desplegando versión segura y testeada ✅"`} />
              </div>
            </Collapsible>

          </div>
        </Card>
      </div>

      {/* Conexión con módulos anteriores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitMerge size={18} color="var(--primary)" /> Cómo conecta con lo que ya vimos
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          GitHub Actions es el hilo conductor de todo el módulo. Cada concepto anterior tiene su lugar en el pipeline:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {moduleLinks.map((link, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.09 }}>
              <Card style={{ borderLeft: `3px solid ${link.color}` }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: `${link.color}15`, borderRadius: 'var(--radius-md)', color: link.color, flexShrink: 0 }}>
                    <link.icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: link.color }}>{link.module}</span>
                      <ArrowRight size={14} color="var(--text-secondary)" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{link.action}</span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6 }}>{link.relation}</p>
                    <Collapsible label={`Ver step de Actions — ${link.module}`}>
                      <CodeBlock code={link.example} />
                    </Collapsible>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pipeline completo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Play size={18} color="var(--primary)" /> Pipeline completo — todo junto
        </h3>
        <Card>
          <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Este workflow une todos los módulos en un solo archivo. Corre en cada PR hacia <code>main</code> y bloquea el merge si algún paso falla.
          </p>

          {/* Flujo visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem', justifyContent: 'center' }}>
            {[
              { label: 'PR abierto', color: '#a78bfa' },
              null,
              { label: 'Secrets scan', color: '#ef4444' },
              null,
              { label: 'Tests + Mocks', color: '#10b981' },
              null,
              { label: 'Audit deps', color: '#f59e0b' },
              null,
              { label: 'SAST', color: '#3b82f6' },
              null,
              { label: '✅ Merge libre', color: '#22c55e' },
            ].map((item, i) =>
              item === null
                ? <ArrowRight key={i} size={14} color="var(--text-secondary)" />
                : (
                  <span key={i} style={{ padding: '0.25rem 0.6rem', backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40`, borderRadius: '999px', fontSize: '0.78rem', color: item.color, fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )
            )}
          </div>

          <Collapsible label="Ver el workflow completo (.github/workflows/security.yml)">
            <CodeBlock label=".github/workflows/security.yml" code={`name: Security Pipeline

on:
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # para OIDC con AWS IAM
      contents: read

    steps:
      - uses: actions/checkout@v4

      # 1. Escaneo de secretos (Factor Humano / IAM)
      - name: Scan for secrets
        uses: gitleaks/gitleaks-action@v2

      # 2. Tests con mocks (Mocks y Testing)
      - name: Run tests
        run: go test -v -race -coverprofile=coverage.out ./...

      - name: Check coverage threshold
        run: |
          COVERAGE=$(go tool cover -func=coverage.out | grep total | awk '{print $3}' | tr -d '%')
          echo "Coverage: $COVERAGE%"
          [ $(echo "$COVERAGE >= 70" | bc) -eq 1 ] || exit 1

      # 3. Audit de dependencias (DevSecOps)
      - name: Dependency audit
        run: go list -json -deps ./... | nancy sleuth

      # 4. Análisis estático (SAST)
      - name: Static analysis
        uses: securego/gosec@master
        with:
          args: ./...

      # 5. Deploy con IAM via OIDC (IAM y Triple A)
      - name: Configure AWS via OIDC (no secrets!)
        if: github.ref == 'refs/heads/main'
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::ACCOUNT:role/GitHubActions
          aws-region: us-east-1

      - name: Deploy API
        if: github.ref == 'refs/heads/main'
        run: ./scripts/deploy.sh`} />
          </Collapsible>
        </Card>
      </div>

      {/* Resultado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
        <Card style={{ border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.04)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} color="#22c55e" />
            <strong style={{ color: '#22c55e', fontSize: '0.92rem' }}>Si todo pasa</strong>
          </div>
          {['Merge habilitado automáticamente', 'Código validado por 4 capas de seguridad', 'Deploy a producción sin intervención manual'].map(t => (
            <p key={t} style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>· {t}</p>
          ))}
        </Card>
        <Card style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.04)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <XCircle size={18} color="#ef4444" />
            <strong style={{ color: '#ef4444', fontSize: '0.92rem' }}>Si algo falla</strong>
          </div>
          {['Merge bloqueado automáticamente', 'El dev recibe feedback en el PR inmediato', 'El bug nunca llega a main ni a producción'].map(t => (
            <p key={t} style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>· {t}</p>
          ))}
        </Card>
      </div>

    </div>
  );
}
