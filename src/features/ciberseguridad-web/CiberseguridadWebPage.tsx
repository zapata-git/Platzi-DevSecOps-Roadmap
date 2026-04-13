import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ShieldAlert, 
  Users, 
  MessageSquareWarning, 
  GitBranch, 
  Database, 
  Link as LinkIcon, 
  Settings,
  ShieldCheck,
  CloudCog,
  FileCode2,
  BellRing
} from 'lucide-react';

export function CiberseguridadWebPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Section */}
      <Card style={{ background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(var(--primary-rgb), 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
            <Users size={48} />
          </div>
          <h2 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            La ciberseguridad efectiva empieza por las personas
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
            En desarrollo de software, el riesgo crítico no se resuelve solo con un servidor robusto, sino con <strong>hábitos seguros y decisiones informadas</strong>. Con un caso práctico que integra GitHub Webhooks, Auth0 e IAM, aprenderás a proteger datos, credenciales y API keys sin convertirte en el head de seguridad.
          </p>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Factor Humano */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--error)' }}>
            <ShieldAlert size={28} />
            <h3 style={{ margin: 0 }}>¿Por qué el riesgo eres tú?</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
            La mayor amenaza no siempre es técnica. Los riesgos se reducen cuando toda la organización aprende ciberseguridad y evita caer en engaños que explotan el factor humano.
          </p>
        </Card>

        {/* Social Engineering */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--warning)' }}>
            <MessageSquareWarning size={28} />
            <h3 style={{ margin: 0 }}>Social Engineering</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Los atacantes usan la persuasión para robar credenciales. En enero de 2024, usuarios de Payoneer Argentina fueron hackeados mediante mensajes que simulaban ser de Movistar.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Mensajes de texto con enlaces falsos.</li>
            <li>Llamadas haciéndose pasar por el jefe.</li>
            <li><strong>Sin técnicas avanzadas</strong>: solo interacciones sociales.</li>
          </ul>
        </Card>
      </div>

      {/* Caso Práctico */}
      <Card style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>
          El Proyecto: Integración Segura
        </h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Trabajarás en un escenario real: ayudar a un engineering manager a recolectar métricas de desarrolladores para su <em>performance review</em>. 
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}>
              <GitBranch size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>1. Recepción en tiempo real</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Conexión a GitHub Webhooks para recibir contribuciones a distintos repositorios.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
              <Database size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>2. Almacenamiento seguro</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Guardado de la información en una base de datos aplicando validación y depuración.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: 'var(--secondary)' }}>
              <LinkIcon size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>3. Acceso Restringido</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Acceso limitado al engineering manager mediante un token de autenticación de Auth0.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Habilidades */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Habilidades que aplicarás</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          El objetivo no es que seas el head de seguridad, sino que tomes decisiones responsables orientadas a minimizar brechas:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { icon: ShieldCheck, title: 'Validación de entradas', desc: 'Controlar lo que ingresa para reducir riesgos.' },
            { icon: Settings, title: 'Manejo de credenciales', desc: 'Proteger accesos y usos de credenciales.' },
            { icon: Users, title: 'Roles y policies con IAM', desc: 'Delimitar permisos con precisión.' },
            { icon: FileCode2, title: 'GitHub Actions', desc: 'Automatizar flujos sin exponer información sensible.' },
            { icon: CloudCog, title: 'Infraestructura como código', desc: 'Terraform para gestionar recursos de forma consistente.' },
            { icon: BellRing, title: 'Observabilidad', desc: 'Monitorear eventos y reaccionar a tiempo.' }
          ].map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            >
              <div style={{ color: 'var(--primary)' }}>
                <skill.icon size={24} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{skill.title}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: 'rgba(var(--secondary-rgb), 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--secondary)', border: '1px solid rgba(var(--secondary-rgb), 0.2)', textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 500 }}>
             Todo apunta a que estés un paso adelante en seguridad y seas mejor desarrollador al interactuar con sistemas, BDD, información de usuarios y API keys.
          </p>
        </div>
      </div>

      {/* Footer / Comments */}
      <Card style={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquareWarning size={18} color="var(--warning)" />
            Comparte tu experiencia
          </h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            ¿Has enfrentado phishing por SMS o llamadas que suplantan a un jefe?
          </p>
        </div>
        <Button onClick={() => alert("Abriendo sección de comentarios...")}>
          Dejar un comentario
        </Button>
      </Card>
      
    </div>
  );
}
