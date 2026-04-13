import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import {
  BookOpen,
  GitBranch,
  Webhook,
  Server,
  Terminal,
  GitCommit,
  Globe,
  Settings2,
  FileCode2,
  PackageCheck,
  Zap,
  Bell,
} from 'lucide-react';

const Section = ({ icon: Icon, color, title, children }: { icon: React.ComponentType<{ size?: number; color?: string }>; color: string; title: string; children: React.ReactNode }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color }}>
      <Icon size={26} />
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
    {children}
  </Card>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre style={{
    margin: 0, padding: '1rem', backgroundColor: 'var(--panel-bg)',
    borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
    fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-secondary)',
    overflowX: 'auto', lineHeight: 1.6, whiteSpace: 'pre'
  }}>{code}</pre>
);

const Step = ({ n, title, desc }: { n: number; title: string; desc: string }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
    <div style={{
      minWidth: '2rem', height: '2rem', borderRadius: '50%',
      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
      color: 'var(--primary)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
    }}>{n}</div>
    <div>
      <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{title}</strong>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>{desc}</p>
    </div>
  </div>
);

export function BackendGoWebhooksPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.1) 0%, rgba(var(--secondary-rgb),0.1) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)', textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(var(--primary-rgb),0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
            <Webhook size={48} />
          </div>
        </div>
        <h2 style={{ margin: '0 0 0.75rem', fontSize: '2.2rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Backend Go + ngrok + GitHub Webhooks
        </h2>
        <p style={{ margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
          Crea una API REST en Go con Gorilla Mux, gestiona dependencias con <code>go mod</code> y recibe webhooks de GitHub en local usando ngrok — sin desplegar nada.
        </p>
      </Card>

      {/* ¿Qué es un Webhook? */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Título de sección */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
            <Zap size={22} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.4rem' }}>¿Qué es un Webhook?</h3>
        </div>

        {/* Analogía visual */}
        <Card style={{ background: 'linear-gradient(135deg, rgba(var(--secondary-rgb),0.08) 0%, rgba(var(--primary-rgb),0.06) 100%)', border: '1px solid rgba(var(--secondary-rgb),0.2)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3rem', lineHeight: 1 }}>🍕</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1rem', color: 'var(--secondary)' }}>La analogía del restaurante</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                En vez de llamar al restaurante cada 5 minutos para preguntar <em>"¿ya está listo mi pedido?"</em>,
                el restaurante <strong style={{ color: 'var(--text-primary)' }}>te llama a ti</strong> cuando está listo.
                Eso es un webhook: el otro sistema te avisa automáticamente cuando ocurre algo.
              </p>
            </div>
          </div>
        </Card>

        {/* Polling vs Webhook — comparativa gráfica */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>

          {/* Polling */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card style={{ border: '1px solid rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.04)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>❌</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: '#ef4444', fontSize: '1rem' }}>Sin webhook</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Polling — preguntar constantemente</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { emoji: '🔄', text: 'Tu app pregunta cada X segundos' },
                  { emoji: '😴', text: 'GitHub: "No... no... no... no..."' },
                  { emoji: '🔥', text: 'Consume recursos sin necesidad' },
                  { emoji: '⏳', text: 'Respuesta siempre con retraso' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.45rem 0.6rem', backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>{item.emoji}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Webhook */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card style={{ border: '1px solid rgba(34,197,94,0.35)', background: 'rgba(34,197,94,0.04)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>✅</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: '#22c55e', fontSize: '1rem' }}>Con webhook</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Event-driven — esperar y recibir</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { emoji: '😌', text: 'Tu app espera en silencio' },
                  { emoji: '🚀', text: 'GitHub detecta el push' },
                  { emoji: '📬', text: 'GitHub te envía los datos al instante' },
                  { emoji: '⚡', text: 'Cero desperdicio de recursos' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.45rem 0.6rem', backgroundColor: 'rgba(34,197,94,0.06)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>{item.emoji}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Diagrama de flujo */}
        <Card style={{ padding: '1.5rem' }}>
          <p style={{ margin: '0 0 1.25rem', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
            Flujo completo de un webhook
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { icon: GitBranch, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', step: '1', label: 'git push', desc: 'El desarrollador sube código al repositorio' },
              { icon: Bell,      color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',  step: '2', label: 'GitHub detecta el evento', desc: 'GitHub reconoce que ocurrió un push en el repo' },
              { icon: Webhook,   color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)',  step: '3', label: 'HTTP POST → tu URL', desc: 'GitHub hace una petición POST a la URL que configuraste' },
              { icon: Globe,     color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)',  step: '4', label: 'ngrok recibe la llamada', desc: 'ngrok actúa de puente entre internet y tu localhost' },
              { icon: Server,    color: '#ec4899', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)',  step: '5', label: 'Tu API en Go procesa', desc: 'El handler lee el payload y extrae head_commit' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem 1rem', backgroundColor: item.bg, borderRadius: 'var(--radius-md)', border: `1px solid ${item.border}` }}
                >
                  <div style={{ minWidth: '2.2rem', height: '2.2rem', borderRadius: '50%', backgroundColor: item.bg, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: item.color }}>{item.step}</span>
                  </div>
                  <div style={{ padding: '0.5rem', backgroundColor: item.bg, borderRadius: 'var(--radius-sm)', flexShrink: 0 }}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: item.color }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </motion.div>
                {i < 4 && (
                  <div style={{ width: '2px', height: '1.25rem', backgroundColor: 'var(--border-color)', margin: '0 auto' }} />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Para qué lo usamos */}
        <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.08) 0%, rgba(var(--secondary-rgb),0.06) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>¿Para qué lo usamos en este curso?</p>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                Cada vez que un developer hace <code>git push</code>, GitHub avisa a nuestra API en Go.
                Leemos <code>head_commit</code> y extraemos quién, cuándo, qué archivos y qué mensaje.
                El engineering manager obtiene métricas <strong style={{ color: 'var(--text-primary)' }}>en tiempo real — sin preguntarle a nadie</strong>.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['quién hizo el commit', 'cuándo', 'qué archivos cambió', 'mensaje del commit'].map(tag => (
                  <span key={tag} style={{ padding: '0.25rem 0.6rem', backgroundColor: 'rgba(var(--primary-rgb),0.12)', borderRadius: '999px', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* Recursos */}
      <Section icon={BookOpen} color="var(--secondary)" title="Recursos y Lecturas Recomendadas">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {[
            { icon: GitBranch, label: 'Repo del curso', sub: 'platzi/Software-seguro', color: 'var(--text-primary)' },
            { icon: Globe, label: 'ngrok', sub: 'Tunneling local → URL pública temporal', color: 'var(--primary)' },
            { icon: Server, label: 'Backend con Go', sub: 'Referencia del lenguaje del curso', color: 'var(--secondary)' },
            { icon: BookOpen, label: 'Curso IA para Developers', sub: 'Complemento transversal — Platzi', color: 'var(--warning)' },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'flex-start' }}>
                <r.icon size={20} color={r.color} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>{r.label}</strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{r.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Entorno Go */}
      <Section icon={PackageCheck} color="var(--primary)" title="Entorno Go — GitHubTracker">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="go mod init GitHubTracker" desc="Inicializa el módulo y define el nombre del proyecto." />
            <Step n={2} title="go get github.com/gorilla/mux" desc="Instala Gorilla Mux como router HTTP. Revisa go.mod actualizado." />
            <Step n={3} title="go mod vendor" desc="Crea la carpeta vendor con dependencias locales para evitar fallos de resolución." />
            <Step n={4} title="go mod tidy" desc="Limpia y sincroniza referencias en go.mod y go.sum." />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CodeBlock code={`# dentro de GitHubTracker/
go mod init GitHubTracker

# instala el router
go get github.com/gorilla/mux

# dependencias locales
go mod vendor

# limpia referencias
go mod tidy`} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { f: 'go.mod', desc: 'módulo + dependencias declaradas' },
                { f: 'go.sum', desc: 'checksums de integridad' },
              ].map(f => (
                <div key={f.f} style={{ flex: 1, padding: '0.6rem 0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <code style={{ display: 'block', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.2rem' }}>{f.f}</code>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* API REST */}
      <Section icon={FileCode2} color="var(--secondary)" title="API REST con Gorilla Mux">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { title: 'mux.NewRouter()', desc: 'Centraliza todas las rutas de la app.' },
              { title: 'POST /hello', desc: 'Endpoint que recibe payloads entrantes (webhooks).' },
              { title: 'io.ReadAll(r.Body)', desc: 'Lee el body como bytes y lo convierte a string legible.' },
              { title: 'defer r.Body.Close()', desc: 'Libera memoria al terminar el handler.' },
              { title: 'Fail fast', desc: 'Si hay error → log.Println(err) + return inmediato. Sin código muerto.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--secondary)', marginTop: '0.5rem', flexShrink: 0 }} />
                <div>
                  <code style={{ color: 'var(--secondary)', fontWeight: 700 }}>{item.title}</code>
                  <p style={{ margin: '0.1rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <CodeBlock code={`package main

import (
  "fmt"
  "io"
  "log"
  "net/http"
  "github.com/gorilla/mux"
)

func postHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Println("Received post request")
  defer r.Body.Close()

  body, err := io.ReadAll(r.Body)
  if err != nil {
    fmt.Println("Error reading the request")
    log.Println(err)
    return
  }
  fmt.Println(string(body))
}

func main() {
  r := mux.NewRouter()
  r.HandleFunc("/hello", postHandler).Methods("POST")

  fmt.Println("Server listening on port 8080")
  if err := http.ListenAndServe(":8080", r); err != nil {
    log.Println(err)
  }
}`} />
        </div>
      </Section>

      {/* ngrok + Webhooks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Section icon={Terminal} color="var(--primary)" title="ngrok — Túnel hacia localhost">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="Levanta el servidor" desc="go run main.go → escucha en :8080" />
            <Step n={2} title="Abre un túnel" desc="ngrok http 8080 → genera una URL pública temporal" />
            <Step n={3} title="Copia la URL" desc="La usarás como Payload URL en el webhook de GitHub." />
          </div>
          <CodeBlock code={`# terminal 1
go run main.go

# terminal 2
ngrok http 8080
# → https://abc123.ngrok.io`} />
        </Section>

        <Section icon={Webhook} color="var(--secondary)" title="Webhooks de GitHub">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Payload URL', val: '<ngrok-url>/hello' },
              { label: 'Content type', val: 'application/json' },
              { label: 'Secret', val: 'ninguno por ahora' },
              { label: 'SSL verification', val: 'habilitada ✅' },
              { label: 'Evento disparador', val: 'push' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                <code style={{ color: 'var(--text-primary)' }}>{r.val}</code>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Payload head_commit */}
      <Section icon={GitCommit} color="var(--warning)" title="Flujo de Eventos y Payload útil">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700 }}>1️⃣ Crear webhook</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GitHub envía un evento "ping" para confirmar la conexión.</p>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700 }}>2️⃣ git push</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GitHub envía el payload completo al servidor local via ngrok.</p>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(var(--warning-rgb),0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--warning-rgb),0.2)' }}>
              <p style={{ margin: '0 0 0.4rem', fontWeight: 700, color: 'var(--warning)' }}>head_commit — lo más útil</p>
              {['id — hash del commit', 'timestamp — fecha y hora exacta', 'author — nombre + email', 'message — mensaje del commit', 'modified — archivos cambiados'].map(f => (
                <p key={f} style={{ margin: '0.2rem 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>· {f}</p>
              ))}
            </div>
          </div>
          <CodeBlock code={`// head_commit del payload
{
  "id": "abc123...",
  "timestamp": "2024-01-15T10:30:00Z",
  "author": {
    "name": "Dev Name",
    "email": "dev@email.com"
  },
  "message": "feat: add webhook handler",
  "modified": [
    "main.go",
    "go.mod"
  ]
}`} />
        </div>
      </Section>

      {/* .gitignore */}
      <Section icon={Settings2} color="var(--text-secondary)" title="Archivos de Configuración">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>.gitignore</p>
            <CodeBlock code={`/vendor/\n.DS_Store`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <code style={{ color: 'var(--warning)', fontWeight: 700 }}>/vendor/</code>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Excluye dependencias locales del repo remoto.</p>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <code style={{ color: 'var(--warning)', fontWeight: 700 }}>.DS_Store</code>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Excluye metadata de macOS del historial de git.</p>
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}
