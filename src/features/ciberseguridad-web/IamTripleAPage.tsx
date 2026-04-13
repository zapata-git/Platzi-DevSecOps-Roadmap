import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import {
  ShieldCheck,
  UserCheck,
  ScrollText,
  Crown,
  KeyRound,
  Smartphone,
  Tag,
  FileJson,
  AlertTriangle,
} from 'lucide-react';

const Section = ({ icon: Icon, color, title, children }: { icon: any; color: string; title: string; children: React.ReactNode }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color }}>
      <Icon size={26} />
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
    {children}
  </Card>
);

const Step = ({ n, title, desc }: { n: number; title: string; desc: string }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
    <div style={{
      minWidth: '2rem', height: '2rem', borderRadius: '50%',
      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
      color: 'var(--primary)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
    }}>{n}</div>
    <div>
      <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{title}</strong>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>{desc}</p>
    </div>
  </div>
);

export function IamTripleAPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.1) 0%, rgba(var(--secondary-rgb),0.1) 100%)', border: '1px solid rgba(var(--primary-rgb),0.2)', textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(var(--primary-rgb),0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
            <ShieldCheck size={48} />
          </div>
        </div>
        <h2 style={{ margin: '0 0 0.75rem', fontSize: '2.2rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          IAM y Principios AAA en AWS
        </h2>
        <p style={{ margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
          Domina autenticación, autorización y accountability con IAM para operar AWS de forma segura, trazable y sin depender del usuario root.
        </p>
      </Card>

      {/* Triple A */}
      <div>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.5rem' }}>Los 3 Pilares — Triple A</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { icon: KeyRound, color: 'var(--primary)', title: '🪪 Autenticación', q: '¿Quién eres?', desc: 'Verifica la identidad del usuario mediante credenciales válidas: usuario y contraseña.' },
            { icon: UserCheck, color: 'var(--secondary)', title: '🚦 Autorización', q: '¿Qué puedes hacer?', desc: 'Define los permisos específicos sobre recursos y acciones. Entrar no implica poder hacerlo todo.' },
            { icon: ScrollText, color: 'var(--warning)', title: '📋 Accountability', q: '¿Qué hiciste?', desc: 'Auditoría y trazabilidad completa mediante logs. Evita que todo sea una caja negra.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: item.color }}>
                  <item.icon size={22} />
                  <strong>{item.title}</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{item.q}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* IAM y Triple A */}
      <Section icon={ShieldCheck} color="var(--primary)" title="IAM y la Triple A">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'Crea usuarios y asigna roles', desc: 'Roles que pueden ser asumidos para acotar privilegios.' },
            { label: 'Define políticas de acceso', desc: 'Policies en JSON que controlan la autorización sobre cada recurso.' },
            { label: 'Facilita la auditoría', desc: 'Todo queda registrado, trazable y auditable en CloudTrail.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--primary)', marginTop: '0.1rem' }}><ShieldCheck size={18} /></div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{item.label}</strong>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Crear cuenta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <Section icon={Crown} color="var(--warning)" title="Crear Cuenta AWS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="Registro" desc="Nombre de usuario, verificar correo con código." />
            <Step n={2} title="Contraseña segura" desc="Guardarla en Bitwarden o LastPass desde el inicio." />
            <Step n={3} title="Método de pago" desc="Free trial — sin cobros si te mantienes en los límites." />
            <Step n={4} title="Plan soporte básico" desc="Gratuito. Accede a la consola y empieza." />
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(var(--warning-rgb),0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--warning-rgb),0.25)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="var(--warning)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong>Regla de oro:</strong> Root solo para tareas críticas. Para el día a día usa un usuario IAM Admin.
            </p>
          </div>
        </Section>

        <Section icon={FileJson} color="var(--secondary)" title="Usuario Administrador IAM">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="IAM → Usuarios → Crear usuario" desc="Activa acceso a consola y define una contraseña conocida." />
            <Step n={2} title="Adjuntar policy" desc="Selecciona AdministratorAccess directamente." />
            <Step n={3} title="Entender la policy" desc='JSON que dice "permite TODA acción sobre TODO".' />
            <Step n={4} title="Confirmar y crear" desc="Usa este usuario para todo el trabajo diario." />
          </div>
          <div style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.82rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {`{ "Effect": "Allow",\n  "Action": "*",\n  "Resource": "*" }`}
          </div>
        </Section>
      </div>

      {/* MFA + Alias */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <Section icon={Smartphone} color="var(--primary)" title="MFA para el Usuario Root">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="Dashboard IAM → Add MFA" desc="Elige aplicación de autenticación." />
            <Step n={2} title="App: Authy o Google Authenticator" desc="Escanea el código QR que muestra AWS." />
            <Step n={3} title="Registrar dispositivo" desc='Introduce 2 códigos consecutivos (se renuevan cada minuto). Nómbralo sin espacios, ej: "Personal".' />
            <Step n={4} title="Verificar" desc="Las recomendaciones de seguridad deben quedar en verde ✅." />
          </div>
        </Section>

        <Section icon={Tag} color="var(--secondary)" title="Account Alias + Single URL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Step n={1} title="Crear Account Alias" desc='Reemplaza el Account ID numérico por un nombre legible, ej: "platzi-security".' />
            <Step n={2} title="Single URL" desc="Genera una URL de acceso con el alias incluido, más fácil de compartir." />
            <Step n={3} title="Cierra sesión root" desc="Entra como usuario IAM usando el alias en lugar del ID." />
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(var(--secondary-rgb),0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--secondary-rgb),0.2)' }}>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--secondary)' }}>
              https://platzi-security.signin.aws.amazon.com/console
            </p>
          </div>
        </Section>
      </div>

      {/* Tip */}
      <Card style={{ backgroundColor: 'rgba(var(--primary-rgb),0.06)', border: '1px solid rgba(var(--primary-rgb),0.2)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>
          💡 <strong>Tip del curso:</strong> Gestionarás contraseñas, credenciales, secretos y API keys. Usa un gestor de contraseñas desde el día 1 — Bitwarden o LastPass.
        </p>
      </Card>

    </div>
  );
}
