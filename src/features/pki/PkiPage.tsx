import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';

// ---------------------------------------------------------------------------
// Simulated certificate viewer
// ---------------------------------------------------------------------------

interface CertInfo {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  serialNumber: string;
  algorithm: string;
  keySize: string;
  san: string[];
  fingerprint: string;
  type: 'root' | 'intermediate' | 'leaf';
}

const CERTS: Record<string, CertInfo> = {
  root: {
    subject: 'CN=DigiCert Global Root CA, O=DigiCert Inc, C=US',
    issuer: 'CN=DigiCert Global Root CA, O=DigiCert Inc, C=US',
    validFrom: '10 Nov 2006',
    validTo: '10 Nov 2031',
    serialNumber: '08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A',
    algorithm: 'SHA-256 con RSA',
    keySize: 'RSA 2048 bits',
    san: [],
    fingerprint: 'A8:98:5D:3A:65:E5:E5:C4:B2:D7:D6:6D:40:C6:DD:2F:B1:9C:54:36',
    type: 'root',
  },
  intermediate: {
    subject: 'CN=DigiCert TLS RSA SHA256 2020 CA1, O=DigiCert Inc, C=US',
    issuer: 'CN=DigiCert Global Root CA, O=DigiCert Inc, C=US',
    validFrom: '14 Sep 2020',
    validTo: '14 Sep 2030',
    serialNumber: '0A:35:08:D5:5C:29:2B:01:7D:F8:AD:65:C0:0F:D1:21',
    algorithm: 'SHA-256 con RSA',
    keySize: 'RSA 2048 bits',
    san: [],
    fingerprint: '1C:58:A3:BD:38:C5:BF:B2:23:3E:62:3E:5B:97:B4:44:E2:B5:2C:08',
    type: 'intermediate',
  },
  leaf: {
    subject: 'CN=platzi.com',
    issuer: 'CN=DigiCert TLS RSA SHA256 2020 CA1, O=DigiCert Inc, C=US',
    validFrom: '1 Ene 2025',
    validTo: '31 Dic 2025',
    serialNumber: '05:F2:E7:3A:9C:1D:00:B8:C4:A2:11:F6:08:55:44:B1',
    algorithm: 'SHA-256 con RSA',
    keySize: 'RSA 2048 bits',
    san: ['platzi.com', 'www.platzi.com', 'api.platzi.com'],
    fingerprint: '7D:2F:AA:09:3C:14:16:37:E4:6B:99:8A:3D:2A:0C:D7:EA:11:22:B3',
    type: 'leaf',
  },
};

const CERT_COLORS = { root: '#ef4444', intermediate: '#f97316', leaf: '#10b981' };
const CERT_LABELS = { root: 'CA Raíz', intermediate: 'CA Intermedia', leaf: 'Certificado Final' };

function CertificateCard({ cert, label }: { cert: CertInfo; label: string }) {
  const color = CERT_COLORS[cert.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: 'var(--bg-color)',
        border: `1px solid ${color}55`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: '0.78rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{
          padding: '0.2rem 0.6rem', backgroundColor: color + '22',
          color, borderRadius: 'var(--radius-md)', fontWeight: 700,
          fontSize: '0.75rem', fontFamily: 'inherit',
        }}>
          {label}
        </span>
        {cert.type === 'root' && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            🔒 Auto-firmado
          </span>
        )}
      </div>

      {[
        { k: 'Sujeto', v: cert.subject },
        { k: 'Emisor', v: cert.issuer },
        { k: 'Válido desde', v: cert.validFrom },
        { k: 'Válido hasta', v: cert.validTo },
        { k: 'Algoritmo', v: cert.algorithm },
        { k: 'Clave pública', v: cert.keySize },
        ...(cert.san.length ? [{ k: 'SAN', v: cert.san.join(', ') }] : []),
        { k: 'Nº serie', v: cert.serialNumber },
        { k: 'Huella SHA-1', v: cert.fingerprint },
      ].map(({ k, v }) => (
        <div key={k} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)', minWidth: '90px', flexShrink: 0 }}>{k}:</span>
          <span style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{v}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TLS Handshake step-by-step
// ---------------------------------------------------------------------------

const TLS_STEPS = [
  {
    id: 1,
    who: 'cliente',
    title: 'Client Hello',
    desc: 'El navegador envía los algoritmos que soporta (cipher suites), la versión TLS y un número aleatorio.',
    detail: 'Incluye: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, versión TLS 1.3, random_client',
  },
  {
    id: 2,
    who: 'servidor',
    title: 'Server Hello + Certificado',
    desc: 'El servidor responde eligiendo el algoritmo, envía su certificado X.509 y su clave pública efímera ECDH.',
    detail: 'Incluye: certificado firmado por CA, public_key_ecdh, random_server',
  },
  {
    id: 3,
    who: 'cliente',
    title: 'Verificación del certificado',
    desc: 'El navegador verifica la cadena de certificados subiendo hasta una CA Raíz de confianza almacenada en el OS.',
    detail: 'Comprueba: firma válida, fecha vigente, dominio coincide (CN/SAN), CA en lista de confianza',
  },
  {
    id: 4,
    who: 'ambos',
    title: 'Intercambio de clave (ECDH)',
    desc: 'Ambas partes derivan independientemente el mismo secreto compartido usando Diffie-Hellman sobre curvas elípticas.',
    detail: 'shared_secret = ECDH(client_private, server_public) = ECDH(server_private, client_public)',
  },
  {
    id: 5,
    who: 'ambos',
    title: 'Derivación de claves de sesión',
    desc: 'Del secreto compartido se derivan las claves AES simétricas para cifrar el tráfico en ambas direcciones.',
    detail: 'session_key = HKDF(shared_secret + random_client + random_server)',
  },
  {
    id: 6,
    who: 'ambos',
    title: 'Conexión cifrada',
    desc: '¡Listo! Todo el tráfico HTTP viaja cifrado con AES-GCM. Esto es lo que muestra el candado 🔒 en el navegador.',
    detail: 'Forward Secrecy garantizado: aunque roben la clave privada del servidor mañana, no pueden descifrar el tráfico de hoy.',
  },
];

function TlsHandshake() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {TLS_STEPS.map((step, i) => {
        const isActive = activeStep === step.id;
        const whoColor = step.who === 'cliente' ? '#0ea5e9' : step.who === 'servidor' ? '#ec4899' : 'var(--primary)';
        return (
          <motion.div
            key={step.id}
            layout
            onClick={() => setActiveStep(isActive ? null : step.id)}
            style={{
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${isActive ? whoColor + '88' : 'var(--border-color)'}`,
              backgroundColor: isActive ? whoColor + '0f' : 'var(--panel-bg)',
              overflow: 'hidden',
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.9rem' }}>
              <span style={{
                width: '1.6rem', height: '1.6rem', borderRadius: '50%', flexShrink: 0,
                backgroundColor: isActive ? whoColor : 'var(--border-color)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem', transition: 'background-color 0.15s',
              }}>{i + 1}</span>

              <span style={{
                padding: '0.15rem 0.5rem', borderRadius: '999px',
                backgroundColor: whoColor + '22', color: whoColor,
                fontSize: '0.72rem', fontWeight: 600, flexShrink: 0,
              }}>
                {step.who === 'ambos' ? '↔ Ambos' : step.who === 'cliente' ? '→ Cliente' : '← Servidor'}
              </span>

              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                {step.title}
              </span>

              <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {isActive ? '▲' : '▼'}
              </span>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 0.9rem 0.9rem 0.9rem', paddingLeft: '3.25rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
                      {step.desc}
                    </p>
                    <pre style={{
                      margin: 0, padding: '0.5rem 0.75rem',
                      backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem', color: whoColor, fontFamily: "'Fira Code', 'Consolas', monospace",
                      whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                      border: `1px solid ${whoColor}33`,
                    }}>
                      {step.detail}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Trust chain visualizer
// ---------------------------------------------------------------------------

function TrustChain() {
  const [selected, setSelected] = useState<'root' | 'intermediate' | 'leaf'>('leaf');

  const chain = [
    { id: 'root' as const, label: 'CA Raíz', name: 'DigiCert Global Root CA', desc: 'Pre-instalada en tu OS/navegador. Auto-firmada. El ancla de toda la confianza.', icon: '🏛️' },
    { id: 'intermediate' as const, label: 'CA Intermedia', name: 'DigiCert TLS RSA SHA256 2020 CA1', desc: 'Firmada por la CA Raíz. Emite certificados a sitios web. Limita la exposición de la clave raíz.', icon: '🏢' },
    { id: 'leaf' as const, label: 'Certificado del sitio', name: 'platzi.com', desc: 'Firmado por la CA Intermedia. Contiene la clave pública del servidor y los dominios válidos.', icon: '🌐' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {chain.map((node, i) => {
        const isSelected = selected === node.id;
        const color = CERT_COLORS[node.id];
        return (
          <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div
              onClick={() => setSelected(node.id)}
              whileHover={{ x: 4 }}
              style={{
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${isSelected ? color : 'var(--border-color)'}`,
                backgroundColor: isSelected ? color + '15' : 'var(--panel-bg)',
                width: '100%', boxSizing: 'border-box',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{node.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, color,
                    padding: '0.1rem 0.4rem', backgroundColor: color + '22',
                    borderRadius: '999px',
                  }}>{node.label}</span>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{node.name}</div>
              </div>
              {node.id === 'root' && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                  🔒 Confianza implícita
                </span>
              )}
            </motion.div>

            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  marginLeft: '3rem', marginTop: '0.25rem', marginBottom: '0.25rem',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: color + '0f', borderRadius: 'var(--radius-md)',
                  borderLeft: `3px solid ${color}`, width: 'calc(100% - 3rem)',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {node.desc}
                </p>
                <button
                  onClick={e => { e.stopPropagation(); setSelected(node.id === selected ? 'leaf' : node.id); }}
                  style={{
                    marginTop: '0.4rem', padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-md)', border: `1px solid ${color}55`,
                    backgroundColor: 'transparent', color, cursor: 'pointer', fontSize: '0.78rem',
                  }}
                >
                  Ver certificado completo ↓
                </button>
              </motion.div>
            )}

            {i < chain.length - 1 && (
              <div style={{
                marginLeft: '1.5rem', width: '2px', height: '1rem',
                backgroundColor: 'var(--border-color)', position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', bottom: -4, left: -14,
                  fontSize: '0.65rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                }}>firma ↓</span>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CertificateCard cert={CERTS[selected]} label={CERT_LABELS[selected]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main PKI page
// ---------------------------------------------------------------------------

export function PkiPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* The problem */}
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
          Infraestructura de Clave Pública (PKI)
        </h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Ya sabes que en criptografía asimétrica cada persona tiene una <strong>clave pública</strong> y
          una <strong>clave privada</strong>. Pero hay un problema fundamental:
        </p>
        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
        }}>
          <strong style={{ color: '#ef4444' }}>El problema de autenticidad:</strong>
          <p style={{ margin: '0.4rem 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Si alguien te envía su clave pública diciendo "soy platzi.com", ¿cómo sabes que realmente
            es Platzi y no un atacante que interceptó la comunicación? Sin una tercera entidad de
            confianza, cualquiera puede suplantar a cualquiera.
          </p>
        </div>
        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 'var(--radius-md)',
        }}>
          <strong style={{ color: '#10b981' }}>La solución — PKI:</strong>
          <p style={{ margin: '0.4rem 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Una <strong>Autoridad de Certificación (CA)</strong> actúa como notario digital. Verifica
            que "platzi.com" es realmente Platzi y firma ese hecho con su propia clave privada,
            creando un <strong>certificado digital</strong>. Cualquiera puede verificar esa firma
            usando la clave pública de la CA.
          </p>
        </div>
      </Card>

      {/* Passport analogy */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>La analogía del pasaporte</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { icon: '🏛️', pki: 'CA Raíz', real: 'Gobierno', desc: 'Máxima autoridad, todo el mundo confía en él por convención' },
            { icon: '🏢', pki: 'CA Intermedia', real: 'Consulado / Notaría', desc: 'Delegado por el gobierno para emitir documentos verificables' },
            { icon: '📄', pki: 'Certificado X.509', real: 'Pasaporte / DNI', desc: 'Documento firmado que acredita la identidad de su portador' },
            { icon: '🔑', pki: 'Clave pública del sitio', real: 'Foto en el pasaporte', desc: 'Dato público que identifica unívocamente al titular' },
            { icon: '🔏', pki: 'Firma digital de la CA', real: 'Sello del gobierno', desc: 'Imposible de falsificar sin la clave privada de la CA' },
            { icon: '💻', pki: 'Tu navegador / OS', real: 'Funcionario de fronteras', desc: 'Verifica el documento comprobando el sello contra la lista oficial' },
          ].map(item => (
            <div key={item.pki} style={{
              padding: '0.8rem', backgroundColor: 'var(--panel-bg)',
              borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{item.icon}</div>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'rgba(152,202,63,0.15)', padding: '0.1rem 0.4rem', borderRadius: '999px' }}>{item.pki}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', backgroundColor: 'var(--panel-bg-hover)', padding: '0.1rem 0.4rem', borderRadius: '999px' }}>= {item.real}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* What's inside a certificate */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>¿Qué contiene un certificado X.509?</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          Un certificado es un documento estructurado que contiene información verificable. Haz clic
          en cada nodo para ver el certificado real de cada nivel de la cadena de Platzi:
        </p>
        <TrustChain />
      </Card>

      {/* TLS handshake */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
          ¿Cómo funciona HTTPS? — El TLS Handshake
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Cada vez que tu navegador abre una URL con <code>https://</code>, ocurre este proceso en
          milisegundos antes de que llegue el primer byte de contenido. Haz clic en cada paso:
        </p>
        <TlsHandshake />
        <div style={{
          marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(152,202,63,0.08)', border: '1px solid rgba(152,202,63,0.3)',
          fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--primary)' }}>¿Por qué PKI + ECDH juntos?</strong> PKI resuelve
          la autenticación (¿con quién hablo?). ECDH resuelve la confidencialidad (¿cómo ciframos?).
          TLS 1.3 los combina: usa el certificado para autenticar al servidor y ECDH para acordar la
          clave de sesión AES que cifra todo el tráfico.
        </div>
      </Card>

      {/* Types of certificates */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Tipos de validación de certificados</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            {
              type: 'DV', name: 'Domain Validation', color: '#eab308',
              desc: 'Solo verifica que controlas el dominio (respondiendo un challenge HTTP o DNS). Emitido en minutos. Lo usan Let\'s Encrypt y la mayoría de webs.',
              example: '🔒 platzi.com',
            },
            {
              type: 'OV', name: 'Organization Validation', color: '#f97316',
              desc: 'La CA verifica que la organización existe legalmente además del dominio. El nombre de la empresa aparece en el certificado.',
              example: '🔒 Platzi Inc — platzi.com',
            },
            {
              type: 'EV', name: 'Extended Validation', color: '#10b981',
              desc: 'Verificación rigurosa de identidad empresarial. Antes mostraba la barra verde en navegadores. Usado por bancos y gobiernos. El proceso puede tardar días.',
              example: '🔒 [Platzi Inc] platzi.com',
            },
            {
              type: 'Wildcard', name: 'Wildcard Certificate', color: '#2563eb',
              desc: 'Un solo certificado cubre todos los subdominios de un dominio (*.platzi.com cubre api.platzi.com, blog.platzi.com, etc.).',
              example: '🔒 *.platzi.com',
            },
          ].map(item => (
            <div key={item.type} style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--panel-bg)', borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  fontWeight: 700, fontSize: '0.85rem', color: item.color,
                  backgroundColor: item.color + '22', padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-md)', display: 'block',
                }}>{item.type}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.3rem' }}>{item.desc}</div>
                <code style={{ fontSize: '0.78rem', color: item.color, backgroundColor: item.color + '11', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{item.example}</code>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>¿Cómo encaja todo?</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          {[
            { text: 'CA Raíz', bg: '#ef444422', color: '#ef4444' },
            { text: '→ firma →', bg: 'transparent', color: 'var(--text-secondary)' },
            { text: 'CA Intermedia', bg: '#f9731622', color: '#f97316' },
            { text: '→ firma →', bg: 'transparent', color: 'var(--text-secondary)' },
            { text: 'Certificado sitio', bg: '#10b98122', color: '#10b981' },
            { text: '→ contiene →', bg: 'transparent', color: 'var(--text-secondary)' },
            { text: 'Clave pública', bg: 'rgba(152,202,63,0.2)', color: 'var(--primary)' },
            { text: '→ usada en →', bg: 'transparent', color: 'var(--text-secondary)' },
            { text: 'TLS Handshake', bg: '#2563eb22', color: '#2563eb' },
            { text: '→ genera →', bg: 'transparent', color: 'var(--text-secondary)' },
            { text: 'Sesión AES cifrada', bg: 'rgba(152,202,63,0.2)', color: 'var(--primary)' },
          ].map((item, i) => (
            <span key={i} style={{
              padding: item.bg === 'transparent' ? '0' : '0.25rem 0.6rem',
              backgroundColor: item.bg,
              color: item.color,
              borderRadius: 'var(--radius-md)',
              fontWeight: item.bg === 'transparent' ? 400 : 600,
              whiteSpace: 'nowrap',
            }}>
              {item.text}
            </span>
          ))}
        </div>
        <p style={{ marginTop: '1rem', marginBottom: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          Los conceptos que aprendiste en este curso — Diffie-Hellman, RSA, AES, ECC, Hashing, HMAC y Firmas Digitales —
          son exactamente los bloques que forman HTTPS. PKI es el sistema de confianza que los orquesta.
        </p>
      </Card>
    </motion.div>
  );
}
