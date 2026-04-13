import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

interface Props {
  topic: string;
}

interface OwaspItem {
  code: string;
  title: string;
  severity: 'Crítico' | 'Alto' | 'Medio';
  severityColor: string;
  description: string;
  example: string;
  codeSnippet?: { label: string; lines: string[] };
  mitigations: string[];
}

const owaspData: Record<string, OwaspItem> = {
  'a01-broken-access-control': {
    code: 'A01:2025',
    title: 'Control de Acceso Defectuoso',
    severity: 'Crítico',
    severityColor: '#ef4444',
    description:
      'Ocurre cuando los usuarios pueden acceder a recursos o realizar acciones que van más allá de sus permisos previstos — leer datos ajenos, escalar privilegios o ejecutar operaciones restringidas.',
    example:
      'Una app bancaria expone /account/{id}. Un atacante cambia la URL de /account/123 a /account/456 y accede a la cuenta de otro usuario sin ninguna autorización.',
    mitigations: [
      'Implementar control de acceso basado en roles (RBAC) y verificar permisos en el servidor, nunca solo en el cliente.',
      'Denegar todo acceso por defecto: solo permitir lo explícitamente autorizado.',
      'Usar frameworks de seguridad para centralizar la gestión de control de acceso.',
      'Registrar fallos de autorización y alertar en intentos repetidos.',
    ],
  },
  'a02-cryptographic-failures': {
    code: 'A02:2025',
    title: 'Fallos Criptográficos',
    severity: 'Crítico',
    severityColor: '#ef4444',
    description:
      'Surge cuando datos sensibles (contraseñas, tarjetas de crédito, tokens) no están protegidos adecuadamente: almacenados en texto plano, usando algoritmos obsoletos como MD5/SHA-1, o transmitidos sin TLS.',
    example:
      'Un sitio almacena contraseñas en texto plano. Si la base de datos es comprometida, todas las credenciales quedan expuestas de inmediato. Usar MD5 o SHA-1 también permite romperlas con tablas rainbow en segundos.',
    mitigations: [
      'Almacenar contraseñas con bcrypt o Argon2 (nunca MD5, SHA-1 ni SHA-256 sin sal).',
      'Usar AES-256 para cifrado de datos en reposo.',
      'Forzar TLS (HTTPS) en todas las comunicaciones y no cachear datos sensibles.',
      'Clasificar los datos por sensibilidad y aplicar controles proporcionales.',
    ],
  },
  'a03-injection': {
    code: 'A03:2025',
    title: 'Inyección',
    severity: 'Crítico',
    severityColor: '#ef4444',
    description:
      'Ocurre cuando una entrada no confiable es interpretada como parte de un comando o consulta. Incluye SQL Injection, NoSQL Injection, OS Command Injection, LDAP Injection y XSS.',
    example:
      'Un formulario de login ejecuta la siguiente consulta. El atacante introduce \' OR 1=1 -- como username, lo que hace que la condición siempre sea verdadera y otorga acceso sin contraseña:',
    codeSnippet: {
      label: 'SQL Injection',
      lines: [
        '-- Consulta original:',
        "SELECT * FROM users WHERE username = 'user' AND password = 'pass';",
        '',
        '-- Con la entrada del atacante (username: \' OR 1=1 --):',
        "SELECT * FROM users WHERE username = '' OR 1=1 -- ' AND password = '';",
        '-- ↑ Siempre devuelve TRUE → acceso sin contraseña',
      ],
    },
    mitigations: [
      'Usar consultas parametrizadas o un ORM (SQLAlchemy, Entity Framework) — nunca concatenar strings con input del usuario.',
      'Sanear y validar todos los datos de entrada en el servidor.',
      'Aplicar mínimo privilegio en las cuentas de base de datos.',
      'Para XSS: escapar la salida HTML y configurar Content-Security-Policy.',
    ],
  },
  'a04-insecure-design': {
    code: 'A04:2025',
    title: 'Diseño Inseguro',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Vulnerabilidades introducidas por un diseño arquitectónico defectuoso que no pueden corregirse con una buena implementación. La seguridad debe modelarse desde el diseño, no añadirse después.',
    example:
      'Un sitio de compras permite intentos ilimitados de restablecimiento de contraseña sin verificar que la solicitud provenga del usuario legítimo — facilita ataques de enumeración y abuso masivo.',
    mitigations: [
      'Aplicar Threat Modeling desde la fase de diseño para anticipar vectores de ataque.',
      'Usar patrones de diseño seguros y bibliotecas de referencia establecidas.',
      'Aplicar rate limiting a todos los endpoints sensibles (login, reset, registro).',
      'Revisar el diseño periódicamente con revisiones de código y auditorías de seguridad.',
    ],
  },
  'a05-security-misconfiguration': {
    code: 'A05:2025',
    title: 'Mala Configuración de Seguridad',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Configuraciones por defecto inseguras, incompletas o erróneas: listado de directorios habilitado, credenciales por defecto sin cambiar, mensajes de error detallados en producción, permisos excesivos en cloud.',
    example:
      'Un servidor web tiene habilitado el listado de directorios, exponiendo archivos como /config o /backup. O peor: las credenciales de administrador por defecto (admin:admin) siguen activas en producción.',
    mitigations: [
      'Auditar y reforzar configuraciones periódicamente con herramientas como Infrastructure-as-Code (Terraform, Ansible).',
      'Deshabilitar funciones innecesarias: listado de directorios, mensajes de error detallados, servicios no usados.',
      'Rotar credenciales y exigir contraseñas robustas en todos los sistemas.',
      'Revisar headers HTTP de seguridad: HSTS, X-Frame-Options, Content-Security-Policy.',
    ],
  },
  'a06-vulnerable-components': {
    code: 'A06:2025',
    title: 'Componentes Vulnerables y Obsoletos',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Uso de librerías, frameworks, contenedores o dependencias con vulnerabilidades conocidas (CVEs). Aplica a frontend, backend e infraestructura. Un solo componente desactualizado puede comprometer todo el sistema.',
    example:
      'La filtración de datos de Equifax (2017) expuso información de 147 millones de personas porque no se aplicó un parche a una vulnerabilidad conocida en Apache Struts (CVE-2017-5638) durante meses.',
    mitigations: [
      'Inventariar todas las dependencias y verificar CVEs con npm audit, OWASP Dependency-Check o Snyk.',
      'Automatizar actualizaciones de seguridad con Dependabot o Renovate.',
      'Suscribirse a alertas de CVE para los stacks tecnológicos en uso.',
      'Preferir dependencias con mantenimiento activo y comunidad amplia.',
    ],
  },
  'a07-auth-failures': {
    code: 'A07:2025',
    title: 'Fallos de Identificación y Autenticación',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Mecanismos de autenticación débiles o mal implementados que permiten a un atacante suplantar identidades — mediante credential stuffing, fuerza bruta, secuestro de sesión o IDs de sesión predecibles.',
    example:
      'Un ID de sesión predecible permite a un atacante calcular tokens válidos de otros usuarios y secuestrar sus sesiones activas. La ausencia de MFA hace triviales los ataques de fuerza bruta o relleno de credenciales.',
    mitigations: [
      'Implementar MFA (autenticación multifactor), especialmente en cuentas privilegiadas.',
      'Usar gestión de sesiones robusta: cookies con flags Secure y HttpOnly, IDs largos y aleatorios.',
      'Aplicar rate limiting y bloqueo temporal tras intentos de login fallidos.',
      'Regenerar el ID de sesión tras cada login para prevenir ataques de fijación de sesión.',
    ],
  },
  'a08-integrity-failures': {
    code: 'A08:2025',
    title: 'Fallos de Integridad de Software y Datos',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Falta de validación de la integridad en actualizaciones de software, pipelines CI/CD inseguros, o deserialización de objetos no confiables. Permite a atacantes inyectar código malicioso en el flujo de distribución.',
    example:
      'Una actualización de software se descarga por HTTP sin verificar su firma. Un atacante intercepta la conexión (MITM) y reemplaza el binario con una versión que incluye malware.',
    mitigations: [
      'Usar actualizaciones firmadas digitalmente y verificar su integridad antes de aplicarlas.',
      'Implementar pipelines CI/CD seguros con revisión de código obligatoria y acceso mínimo.',
      'Verificar checksums y hashes de todos los artefactos externos descargados.',
      'No deserializar datos de fuentes no confiables sin validación estricta del schema.',
    ],
  },
  'a09-logging-failures': {
    code: 'A09:2025',
    title: 'Fallos en Registro y Monitorización',
    severity: 'Medio',
    severityColor: '#eab308',
    description:
      'Sin registro adecuado de eventos de seguridad ni monitorización activa, los ataques no se detectan a tiempo ni pueden ser investigados. Las brechas pueden pasar desapercibidas durante meses.',
    example:
      'Un ataque de fuerza bruta sistemático sobre el formulario de login pasa completamente desapercibido porque los intentos fallidos no se registran. El tráfico anómalo tampoco dispara ninguna alerta.',
    mitigations: [
      'Registrar todos los eventos críticos: intentos de login fallidos, errores de autorización, acceso a datos sensibles.',
      'Usar herramientas SIEM como Splunk o ELK Stack para monitorización en tiempo real y alertas automáticas.',
      'Asegurarse de que los logs no contengan datos sensibles (contraseñas, tokens, PII).',
      'Revisar periódicamente los logs y definir umbrales de alerta para actividad sospechosa.',
    ],
  },
  'a10-ssrf': {
    code: 'A10:2025',
    title: 'Falsificación de Solicitudes del Lado del Servidor (SSRF)',
    severity: 'Alto',
    severityColor: '#f97316',
    description:
      'Ocurre cuando un atacante engaña al servidor para que realice peticiones HTTP a destinos no previstos — servicios internos inaccesibles desde el exterior, metadata de cloud, o recursos de la red privada.',
    example:
      'Una función de carga de archivos acepta una URL para obtener el contenido. El atacante proporciona http://localhost/admin y el servidor la ejecuta, exponiendo el panel de administración interno.',
    mitigations: [
      'Validar y sanear todas las URLs proporcionadas por el usuario antes de procesarlas.',
      'Aplicar una allowlist estricta de dominios e IPs permitidos para requests salientes del servidor.',
      'Limitar o deshabilitar las redirecciones HTTP automáticas.',
      'Implementar segmentación de red para que el servidor no tenga acceso directo a servicios internos críticos.',
    ],
  },
};

const INTRO_LIST = [
  { code: 'A01', label: 'Control de Acceso Defectuoso', color: '#ef4444' },
  { code: 'A02', label: 'Fallos Criptográficos', color: '#ef4444' },
  { code: 'A03', label: 'Inyección', color: '#ef4444' },
  { code: 'A04', label: 'Diseño Inseguro', color: '#f97316' },
  { code: 'A05', label: 'Mala Configuración de Seguridad', color: '#f97316' },
  { code: 'A06', label: 'Componentes Vulnerables y Obsoletos', color: '#f97316' },
  { code: 'A07', label: 'Fallos de Identificación y Autenticación', color: '#f97316' },
  { code: 'A08', label: 'Fallos de Integridad de Software y Datos', color: '#f97316' },
  { code: 'A09', label: 'Fallos en Registro y Monitorización', color: '#eab308' },
  { code: 'A10', label: 'Falsificación de Solicitudes del Lado del Servidor', color: '#f97316' },
];

function IntroView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>¿Qué es OWASP?</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <strong>OWASP</strong> (Open Worldwide Application Security Project) es una fundación sin ánimo de lucro
          dedicada a mejorar la seguridad del software. Su proyecto más conocido es el <strong>OWASP Top 10</strong>:
          una lista de los 10 riesgos de seguridad más críticos en aplicaciones web, actualizada con datos reales
          de miles de organizaciones a nivel mundial.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
          La edición vigente es <strong>OWASP Top 10:2025</strong>. Es el estándar de referencia para
          desarrolladores, auditores de seguridad y equipos de DevSecOps. Comprender estas vulnerabilidades
          es esencial para construir aplicaciones seguras y resilientes.
        </p>
      </Card>

      <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1.2rem' }}>Los 10 Riesgos — 2025</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {INTRO_LIST.map((item) => (
            <div
              key={item.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.6rem 0.8rem',
                backgroundColor: 'var(--panel-bg)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `4px solid ${item.color}`,
              }}
            >
              <span style={{ fontWeight: 700, color: item.color, minWidth: '2.5rem', fontSize: '0.85rem' }}>
                {item.code}
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function OwaspItemView({ item }: { item: OwaspItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '0.3rem 0.8rem',
              backgroundColor: item.severityColor + '22',
              color: item.severityColor,
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: `1px solid ${item.severityColor}55`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.code}
          </span>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.4rem', flex: 1 }}>{item.title}</h2>
          <span
            style={{
              padding: '0.25rem 0.7rem',
              backgroundColor: item.severityColor + '22',
              color: item.severityColor,
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: `1px solid ${item.severityColor}55`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.severity}
          </span>
        </div>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{item.description}</p>
      </Card>

      {/* Example */}
      <Card style={{ borderColor: item.severityColor + '55', borderWidth: '1px' }}>
        <h3 style={{ color: item.severityColor, marginBottom: '0.8rem' }}>Ejemplo real</h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: item.codeSnippet ? '1rem' : 0 }}>
          {item.example}
        </p>
        {item.codeSnippet && (
          <>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {item.codeSnippet.label}
            </p>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                backgroundColor: '#0b0f19',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${item.severityColor}44`,
                fontSize: '0.82rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                overflowX: 'auto',
                fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              }}
            >
              {item.codeSnippet.lines.map((line, i) => {
                const isComment = line.startsWith('--');
                const isHighlight = line.includes('OR 1=1') || line.includes('↑');
                return (
                  <div
                    key={i}
                    style={{
                      color: isHighlight ? item.severityColor : isComment ? '#64748b' : '#e2e8f0',
                      fontStyle: isComment ? 'italic' : 'normal',
                    }}
                  >
                    {line || '\u00A0'}
                  </div>
                );
              })}
            </pre>
          </>
        )}
      </Card>

      {/* Mitigations */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>Prevención</h3>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {item.mitigations.map((m, i) => (
            <li key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {m}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}

export function OwaspPage({ topic }: Props) {
  if (topic === 'intro-owasp' || topic === '') {
    return <IntroView />;
  }

  const item = owaspData[topic];
  if (!item) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Contenido en construcción para: <strong>{topic}</strong>
      </div>
    );
  }

  return <OwaspItemView item={item} />;
}
