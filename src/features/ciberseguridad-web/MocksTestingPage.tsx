import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import {
  FlaskConical,
  ShieldCheck,
  Database,
  Webhook,
  GitBranch,
  Lightbulb,
  ChevronDown,
  ChevronUp,
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
        <span>📎 Ver ejemplo en Go — {label}</span>
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

export function MocksTestingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.08) 0%, rgba(var(--secondary-rgb),0.08) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)', padding: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ padding: '0.9rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
            <FlaskConical size={36} />
          </div>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.8rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mocks y Testing
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Los mocks no son solo una herramienta de testing — son una práctica de seguridad.
              Probar tu código antes de que llegue a producción es la primera línea de defensa contra bugs, brechas y comportamientos inesperados.
            </p>
          </div>
        </div>
      </Card>

      {/* ¿Qué es un mock? */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FlaskConical size={18} color="var(--primary)" /> ¿Qué es un mock?
        </h3>

        <Card style={{ background: 'rgba(var(--secondary-rgb),0.06)', border: '1px solid rgba(var(--secondary-rgb),0.2)' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.8rem', lineHeight: 1, flexShrink: 0 }}>🎭</span>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Un doble de actuación para tu código</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                Un mock es un objeto falso que <strong style={{ color: 'var(--text-primary)' }}>simula el comportamiento de una dependencia real</strong> —
                como una base de datos, una API externa o un webhook — de forma controlada y predecible.
                En vez de conectarte a la BD real para testear, usas un mock que responde exactamente lo que necesitas para cada escenario.
              </p>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {[
            { emoji: '🎯', title: 'Controlado', desc: 'Defines exactamente qué responde en cada test: éxito, error, tiempo de espera.' },
            { emoji: '⚡', title: 'Rápido', desc: 'Sin conexiones reales. Los tests corren en milisegundos, no segundos.' },
            { emoji: '🔁', title: 'Repetible', desc: 'Siempre el mismo resultado. Sin datos sucios ni estado de la BD que varíe.' },
            { emoji: '🧩', title: 'Aislado', desc: 'Testeas una sola pieza a la vez. Si falla, sabes exactamente dónde.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div style={{ padding: '0.9rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '1.3rem' }}>{item.emoji}</p>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mocks + Base de datos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={18} color="var(--primary)" /> Mocks con base de datos
        </h3>

        <Card>
          <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
            El patrón más común: tu lógica de negocio depende de una <strong style={{ color: 'var(--text-primary)' }}>interfaz</strong>, no de la BD directamente.
            En tests, pasas el mock. En producción, pasas la implementación real.
            Tu código no sabe ni le importa la diferencia.
          </p>

          {/* Diagrama */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'Lógica de negocio', sub: 'InsertCommit, GetByEmail...', icon: '⚙️', color: 'var(--primary)' },
              { label: 'Interfaz / Contrato', sub: 'Define qué operaciones existen', icon: '📋', color: 'var(--secondary)' },
              { label: 'Mock (tests)', sub: 'Respuestas simuladas y controladas', icon: '🎭', color: 'var(--warning)' },
              { label: 'BD real (prod)', sub: 'PostgreSQL, MySQL, MongoDB...', icon: '🗄️', color: 'var(--text-secondary)' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: `1px solid ${i === 2 ? 'rgba(var(--warning-rgb),0.3)' : 'var(--border-color)'}`, textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '1.5rem' }}>{item.icon}</p>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.85rem', color: item.color }}>{item.label}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#ef4444', fontSize: '0.88rem' }}>❌ Sin mock</p>
              {['El test necesita una BD activa', 'Si la BD falla, el test falla', 'Datos de test pueden contaminar producción', 'Tests lentos = ciclos de feedback largos'].map((t, i) => (
                <p key={i} style={{ margin: '0.2rem 0', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>· {t}</p>
              ))}
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(34,197,94,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#22c55e', fontSize: '0.88rem' }}>✅ Con mock</p>
              {['Cero dependencias externas', 'Simulas error de BD con una línea', 'Tests aislados y seguros', 'Corren en milisegundos siempre'].map((t, i) => (
                <p key={i} style={{ margin: '0.2rem 0', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>· {t}</p>
              ))}
            </div>
          </div>

          <Collapsible label="estructura del mock de commits">
            <CodeBlock code={`// El mock implementa la misma interfaz que la BD real.
// En tests pasas mockCommit, en producción pasas la BD real.

type mockCommit struct {
    mock.Mock  // gestiona llamadas, parámetros y retornos
}

func (m *mockCommit) Insert(ctx, commit) error {
    args := m.Called(ctx, commit)  // registra y valida argumentos
    return args.Error(0)           // retorna el error que tú programaste
}

// Uso en test:
// mock.On("Insert", ctx, commit).Return(nil)       → simula éxito
// mock.On("Insert", ctx, commit).Return(someError) → simula fallo de BD`} />
          </Collapsible>
        </Card>
      </div>

      {/* Mocks + Webhooks de GitHub */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Webhook size={18} color="var(--primary)" /> Mocks con webhooks de GitHub
        </h3>

        <Card>
          <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
            El flujo que estamos construyendo tiene dos dependencias externas: <strong style={{ color: 'var(--text-primary)' }}>GitHub</strong> (quien envía el webhook)
            y la <strong style={{ color: 'var(--text-primary)' }}>base de datos</strong> (donde guardamos el commit).
            Con mocks, testeamos la lógica del medio sin necesitar ninguna de las dos.
          </p>

          {/* Flujo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '1.25rem' }}>
            {[
              { icon: GitBranch, label: 'git push', note: 'En tests: construyes el payload manualmente', color: '#a78bfa', mock: false },
              { icon: Webhook,   label: 'Webhook payload llega', note: 'En tests: pasas un struct con datos de prueba', color: '#3b82f6', mock: true },
              { icon: '⚙️',     label: 'InsertGitHubWebhook procesa', note: 'Esta es la función que SÍ testeamos', color: '#22c55e', mock: false },
              { icon: Database,  label: 'Guarda en BD', note: 'En tests: el mock responde nil o error', color: '#f59e0b', mock: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.6rem 0.9rem', backgroundColor: item.mock ? 'rgba(var(--warning-rgb),0.06)' : 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: `1px solid ${item.mock ? 'rgba(var(--warning-rgb),0.25)' : 'var(--border-color)'}` }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: `${item.color}20`, border: `2px solid ${item.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {typeof item.icon === 'string'
                      ? <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                      : <item.icon size={14} color={item.color} />
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: item.color }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.note}</p>
                  </div>
                  {item.mock && (
                    <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'rgba(var(--warning-rgb),0.15)', borderRadius: '999px', fontSize: '0.72rem', color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>mock</span>
                  )}
                </div>
                {i < 3 && <div style={{ width: '2px', height: '0.9rem', backgroundColor: 'var(--border-color)' }} />}
              </div>
            ))}
          </div>

          <Collapsible label="InsertGitHubWebhook + test con mock">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <CodeBlock label="La función (agnóstica — no sabe si la BD es real o mock)" code={`// Recibe la interfaz, no la implementación concreta.
// Esto es lo que permite intercambiar BD real ↔ mock.
func InsertGitHubWebhook(ctx, repo Repository, webhook Payload) error {
    commit := buildCommit(webhook)   // construye entity desde el payload
    return repo.Insert(ctx, commit)  // delega al repository (real o mock)
}`} />
              <CodeBlock label="Test con mock" code={`// Simula éxito:
mock.On("Insert", ctx, expectedCommit).Return(nil)
err := InsertGitHubWebhook(ctx, mock, fakeWebhook)
assert.NoError(t, err)

// Simula fallo de BD:
mock.On("Insert", ctx, expectedCommit).Return(errors.New("db down"))
err = InsertGitHubWebhook(ctx, mock, fakeWebhook)
assert.Error(t, err)`} />
            </div>
          </Collapsible>
        </Card>
      </div>

      {/* Por qué importa para la seguridad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="var(--primary)" /> Por qué el testing es seguridad
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {[
            { emoji: '🐛', title: 'Detectas bugs antes', desc: 'Un bug encontrado en test no llega a usuarios ni a datos reales.' },
            { emoji: '🔐', title: 'Validas manejo de errores', desc: 'Simulas "BD caída" o "token inválido" para asegurar que el sistema falla de forma segura.' },
            { emoji: '🧱', title: 'Reduces superficie de ataque', desc: 'Código bien testeado tiene menos ramas sin cubrir que un atacante pueda explotar.' },
            { emoji: '📊', title: 'Cobertura = confianza', desc: 'Alta cobertura de tests te da seguridad para hacer cambios sin romper comportamientos críticos.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div style={{ padding: '0.9rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '1.3rem' }}>{item.emoji}</p>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '0.88rem' }}>{item.title}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip final */}
      <Card style={{ backgroundColor: 'rgba(var(--primary-rgb),0.06)', border: '1px solid rgba(var(--primary-rgb),0.18)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Lightbulb size={20} color="var(--warning)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
          <div>
            <p style={{ margin: '0 0 0.4rem', fontWeight: 700, fontSize: '0.92rem' }}>La regla de oro</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Tu lógica de negocio nunca debería depender directamente de una implementación concreta (BD, API, webhook).
              Siempre depende de una <strong style={{ color: 'var(--text-primary)' }}>interfaz</strong> — eso te permite mockear en tests
              y también cambiar de PostgreSQL a MongoDB mañana sin tocar la lógica.
              Este principio se llama <strong style={{ color: 'var(--primary)' }}>Dependency Inversion</strong> y es la base del código testeable y seguro.
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
}
