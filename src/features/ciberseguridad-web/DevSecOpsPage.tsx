import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import {
  ShieldCheck,
  GitMerge,
  Zap,
  Lock,
  RefreshCw,
  GitBranch,
  Play,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Eye,
  Layers,
} from 'lucide-react';
import devSecOpsDiagram from '../../assets/devsecops-diagram.png';
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

const devLoop = [
  { emoji: '💻', label: 'Code',    color: '#3b82f6', practices: ['Code Review', 'Static Analysis'] },
  { emoji: '🔨', label: 'Build',   color: '#6366f1', practices: ['Dependency Check', 'SAST'] },
  { emoji: '🧪', label: 'Test',    color: '#8b5cf6', practices: ['Penetration Testing', 'DAST'] },
  { emoji: '📦', label: 'Release', color: '#a78bfa', practices: ['Compliance Validation', 'Sign & Verify'] },
];

const opsLoop = [
  { emoji: '🚀', label: 'Deploy',  color: '#f97316', practices: ['Audit', 'Config Hardening'] },
  { emoji: '⚙️', label: 'Operate', color: '#fb923c', practices: ['Monitor', 'Detect'] },
  { emoji: '📊', label: 'Monitor', color: '#fbbf24', practices: ['Response', 'Recover'] },
  { emoji: '🔍', label: 'Threat Intelligence', color: '#f59e0b', practices: ['Threat Intel', 'Log Analysis'] },
];

const techniques = [
  {
    icon: AlertTriangle,
    color: '#f59e0b',
    title: 'Threat Modeling',
    short: 'Pensar como atacante antes de codear',
    desc: 'Antes de implementar una funcionalidad, mapeas qué podría salir mal. ¿Qué datos son sensibles? ¿Dónde hay entrada de usuario? ¿Qué pasa si falla la autenticación?',
    how: 'Usa el framework STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.',
    tools: ['OWASP Threat Dragon', 'Microsoft Threat Modeling Tool', 'draw.io con diagramas de flujo de datos'],
  },
  {
    icon: Eye,
    color: '#3b82f6',
    title: 'Threat Intelligence',
    short: 'Estar al día con vulnerabilidades conocidas',
    desc: 'Consumir información sobre amenazas activas, CVEs recientes y vectores de ataque comunes para tu stack. No necesitas ser experto — solo saber qué buscar.',
    how: 'Suscríbete a feeds de seguridad relevantes para las tecnologías que usas.',
    tools: ['CVE Database (cve.mitre.org)', 'GitHub Security Advisories', 'Dependabot alerts', 'OWASP Dependency-Check'],
  },
  {
    icon: GitMerge,
    color: '#10b981',
    title: 'Approval Gates',
    short: 'Puertas de calidad antes de fusionar',
    desc: 'Reglas automáticas que bloquean un merge a main si no se cumplen criterios: tests pasando, cobertura mínima, sin dependencias vulnerables, revisión de código.',
    how: 'Se configuran en el repositorio como branch protection rules + status checks requeridos.',
    tools: ['GitHub Branch Protection Rules', 'Required status checks', 'CODEOWNERS', 'Dependabot security updates'],
  },
  {
    icon: Layers,
    color: '#ec4899',
    title: 'Pruebas Automatizadas',
    short: 'La herramienta más accesible para el desarrollador',
    desc: 'Unit tests, integration tests y tests de seguridad que corren automáticamente en cada PR. Son la primera línea de defensa que tú, como dev, controlas completamente.',
    how: 'Escribe tests junto al código, no después. Apunta a cubrir los flujos críticos y los casos de error.',
    tools: ['GitHub Actions', 'Jest / Vitest (JS)', 'Testify (Go)', 'pytest (Python)', 'JUnit (Java)'],
  },
];

export function DevSecOpsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.08) 0%, rgba(var(--secondary-rgb),0.08) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)', padding: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ padding: '0.9rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
            <ShieldCheck size={36} />
          </div>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.8rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DevSecOps
            </h2>
            <p style={{ margin: '0 0 0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              DevSecOps no es un equipo ni un rol — es una <strong style={{ color: 'var(--text-primary)' }}>cultura</strong>.
              La idea es simple: la seguridad deja de ser un paso final ("lo revisamos antes del deploy")
              y se convierte en parte de cada fase del ciclo de desarrollo.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Dev + Sec + Ops', 'Shift Left Security', 'CI/CD', 'GitHub Actions'].map(tag => (
                <span key={tag} style={{ padding: '0.2rem 0.6rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', border: '1px solid rgba(var(--primary-rgb),0.25)', borderRadius: '999px', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Diagrama oficial */}
      <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diagrama de referencia</p>
        <img
          src={devSecOpsDiagram}
          alt="DevSecOps infinity loop diagram"
          style={{ width: '100%', maxWidth: '560px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
        />
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          El bucle ∞ une Dev (izquierda) y Ops (derecha) con Plan en el centro — la seguridad está presente en cada nodo.
        </p>
      </Card>

      {/* Dev vs DevOps vs DevSecOps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>La evolución: Dev → DevOps → DevSecOps</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Dev', emoji: '💻', color: '#94a3b8', desc: 'Dev y Ops trabajan en silos. La seguridad es un checklist al final. Los bugs llegan a producción.', tag: 'Modo antiguo' },
            { label: 'DevOps', emoji: '🔄', color: '#3b82f6', desc: 'Dev y Ops colaboran. Entregas continuas, ciclos rápidos. Pero la seguridad aún llega tarde.', tag: 'Mejor, pero incompleto' },
            { label: 'DevSecOps', emoji: '🛡️', color: '#10b981', desc: 'Seguridad integrada en cada fase. Todo el equipo es responsable, no solo el equipo de sec.', tag: 'El estándar actual' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card style={{ border: `1px solid ${item.color}35`, height: '100%' }}>
                <p style={{ margin: '0 0 0.25rem', fontSize: '1.8rem' }}>{item.emoji}</p>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 800, fontSize: '1.1rem', color: item.color }}>{item.label}</p>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.75rem', color: item.color, fontWeight: 600, opacity: 0.8 }}>{item.tag}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* El ciclo — diagrama infinito */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={18} color="var(--primary)" /> El ciclo ∞ — seguridad en cada fase
        </h3>
        <Card>
          <p style={{ margin: '0 0 1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            El diagrama clásico de DevSecOps es un <strong style={{ color: 'var(--text-primary)' }}>bucle infinito (∞)</strong>:
            el lado izquierdo es el flujo de <strong style={{ color: '#3b82f6' }}>Dev</strong>,
            el derecho el de <strong style={{ color: '#f97316' }}>Ops</strong>,
            y <strong style={{ color: 'var(--text-primary)' }}>Plan</strong> es el centro que los une.
            La seguridad no está al final — está en cada nodo.
          </p>

          {/* Loops lado a lado */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'start' }}>

            {/* Loop Dev */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '0.82rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>◀ Dev Loop</p>
              {devLoop.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ padding: '0.6rem 0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: `1px solid ${step.color}35` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{step.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: step.color }}>{step.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {step.practices.map(p => (
                      <span key={p} style={{ padding: '0.1rem 0.45rem', backgroundColor: `${step.color}15`, borderRadius: '999px', fontSize: '0.72rem', color: step.color }}>{p}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Centro — Plan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 0.75rem', backgroundColor: 'rgba(var(--primary-rgb),0.1)', borderRadius: 'var(--radius-md)', border: '2px solid rgba(var(--primary-rgb),0.3)', minWidth: '90px' }}
            >
              <span style={{ fontSize: '1.8rem' }}>∞</span>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>PLAN</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                {['Threat Model', 'Policies', 'Log'].map(p => (
                  <span key={p} style={{ padding: '0.1rem 0.4rem', backgroundColor: 'rgba(var(--primary-rgb),0.15)', borderRadius: '999px', fontSize: '0.68rem', color: 'var(--primary)', whiteSpace: 'nowrap' }}>{p}</span>
                ))}
              </div>
            </motion.div>

            {/* Loop Ops */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '0.82rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Ops Loop ▶</p>
              {opsLoop.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ padding: '0.6rem 0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: `1px solid ${step.color}35` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{step.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: step.color }}>{step.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {step.practices.map(p => (
                      <span key={p} style={{ padding: '0.1rem 0.45rem', backgroundColor: `${step.color}15`, borderRadius: '999px', fontSize: '0.72rem', color: step.color }}>{p}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(var(--primary-rgb),0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--primary-rgb),0.15)', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              🔄 Monitor alimenta a Plan — lo que observas en producción vuelve al inicio del ciclo.
              Esto es <strong style={{ color: 'var(--primary)' }}>Continuous Improvement</strong>.
            </p>
          </div>
        </Card>
      </div>

      {/* Técnicas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={18} color="var(--primary)" /> Técnicas que puede aplicar un desarrollador
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          No necesitas ser experto en seguridad. Estas 4 técnicas están al alcance de cualquier dev y cubren la mayor parte del riesgo cotidiano.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {techniques.map((tech, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Card style={{ borderLeft: `3px solid ${tech.color}` }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ padding: '0.6rem', backgroundColor: `${tech.color}15`, borderRadius: 'var(--radius-md)', color: tech.color, flexShrink: 0 }}>
                    <tech.icon size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: tech.color }}>{tech.title}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{tech.short}</p>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{tech.desc}</p>
                    <p style={{ margin: '0 0 0.6rem', fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      <strong>Cómo:</strong> {tech.how}
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {tech.tools.map(t => (
                        <span key={t} style={{ padding: '0.15rem 0.5rem', backgroundColor: `${tech.color}12`, border: `1px solid ${tech.color}30`, borderRadius: '999px', fontSize: '0.75rem', color: tech.color }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* GitHub Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Play size={18} color="var(--primary)" /> GitHub Actions — el pipeline en la práctica
        </h3>

        <Card>
          <p style={{ margin: '0 0 1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            GitHub Actions convierte tu repositorio en un sistema CI/CD sin servidores externos.
            Cada vez que alguien hace un PR o push, tu pipeline corre automáticamente y
            <strong style={{ color: 'var(--text-primary)' }}> decide si el cambio puede entrar a main</strong>.
          </p>

          {/* Flujo PR */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>Flujo de un Pull Request con Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: GitBranch, label: 'Dev abre un Pull Request',              note: 'Cualquier cambio hacia main dispara el pipeline',         color: '#a78bfa', result: null },
                { icon: Play,      label: 'GitHub Actions corre el workflow',       note: 'Automático, sin intervención humana',                    color: '#3b82f6', result: null },
                { icon: Zap,       label: 'Se ejecutan los checks',                 note: 'Tests, linting, análisis de dependencias, cobertura',    color: '#f59e0b', result: null },
                { icon: CheckCircle, label: 'Todos los checks pasan → merge libre', note: 'El código está validado y puede entrar a main',         color: '#22c55e', result: 'pass' },
                { icon: XCircle,   label: 'Algún check falla → merge bloqueado',    note: 'El dev recibe feedback y debe corregir antes de mergear', color: '#ef4444', result: 'fail' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.6rem 0.9rem', backgroundColor: step.result === 'pass' ? 'rgba(34,197,94,0.06)' : step.result === 'fail' ? 'rgba(239,68,68,0.06)' : 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: `1px solid ${step.result === 'pass' ? 'rgba(34,197,94,0.25)' : step.result === 'fail' ? 'rgba(239,68,68,0.25)' : 'var(--border-color)'}` }}
                  >
                    <step.icon size={18} color={step.color} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: step.color }}>{step.label}</p>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{step.note}</p>
                    </div>
                  </motion.div>
                  {i < 2 && <div style={{ width: '2px', height: '0.75rem', backgroundColor: 'var(--border-color)' }} />}
                  {i === 2 && (
                    <div style={{ display: 'flex', gap: '1rem', margin: '0.3rem 0', alignSelf: 'flex-end', paddingRight: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '2px', height: '0.75rem', backgroundColor: '#22c55e50' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '2px', height: '0.75rem', backgroundColor: '#ef444450' }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Collapsible label="Ver workflow básico de GitHub Actions (.yml)">
            <CodeBlock label="archivo: .github/workflows/ci.yml" code={`name: CI — Tests y Seguridad

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Instalar dependencias
        run: npm install          # o go mod download, pip install, etc.

      - name: Ejecutar tests
        run: npm test             # todos los tests deben pasar

      - name: Verificar cobertura
        run: npm run coverage -- --threshold 80   # mínimo 80%

      - name: Analizar dependencias vulnerables
        run: npm audit --audit-level=high  # bloquea si hay vulns críticas`} />
          </Collapsible>
        </Card>

        {/* Branch protection */}
        <Card style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)' }}>
          <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.95rem' }}>Branch Protection Rules — proteger main</p>
          <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Configura estas reglas en <strong>Settings → Branches → main</strong> de tu repo para que nadie, ni tú, pueda saltarse el pipeline.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
            {[
              { rule: 'Require status checks to pass', desc: 'Los Actions deben estar en verde antes del merge', icon: '✅' },
              { rule: 'Require pull request reviews', desc: 'Al menos 1 revisión humana aprobada', icon: '👀' },
              { rule: 'Dismiss stale reviews', desc: 'Un nuevo push invalida aprobaciones anteriores', icon: '🔄' },
              { rule: 'Require linear history', desc: 'Fuerza un historial limpio sin merge commits', icon: '📏' },
            ].map(r => (
              <div key={r.rule} style={{ padding: '0.7rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <p style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>{r.icon}</p>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{r.rule}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Checklist del dev */}
      <Card style={{ backgroundColor: 'rgba(var(--primary-rgb),0.06)', border: '1px solid rgba(var(--primary-rgb),0.18)' }}>
        <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} color="var(--primary)" /> Checklist DevSecOps para tu próximo PR
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.4rem' }}>
          {[
            '¿Escribiste tests para los cambios?',
            '¿Validaste todos los inputs del usuario?',
            '¿Las credenciales están en variables de entorno?',
            '¿Revisaste dependencias con npm audit / go audit?',
            '¿Tu PR tiene una descripción clara del cambio?',
            '¿Los logs no exponen datos sensibles?',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '0.4rem 0' }}>
              <span style={{ color: 'var(--primary)', marginTop: '0.05rem', flexShrink: 0 }}>□</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
