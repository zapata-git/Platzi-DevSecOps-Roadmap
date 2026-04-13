import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// ---------------------------------------------------------------------------
// Elliptic curve y² = x³ + ax + b  — SVG visualizer
// ---------------------------------------------------------------------------

function CurveVisualizer({ a, b }: { a: number; b: number }) {
  const W = 340;
  const H = 260;
  const CX = W / 2;
  const CY = H / 2;
  const SCALE = 36;

  // Convert math coords → SVG coords
  const toSvg = (x: number, y: number) => ({
    sx: CX + x * SCALE,
    sy: CY - y * SCALE,
  });

  // Build polyline points for the upper and lower branch
  const upperPoints: string[] = [];
  const lowerPoints: string[] = [];

  for (let px = -4.5; px <= 4.5; px += 0.04) {
    const rhs = px ** 3 + a * px + b;
    if (rhs < 0) continue;
    const y = Math.sqrt(rhs);
    const upper = toSvg(px, y);
    const lower = toSvg(px, -y);
    upperPoints.push(`${upper.sx},${upper.sy}`);
    lowerPoints.push(`${lower.sx},${lower.sy}`);
  }

  // Discriminant check — curve is singular if 4a³+27b²=0
  const discriminant = -16 * (4 * a ** 3 + 27 * b ** 2);
  const isSingular = Math.abs(discriminant) < 0.001;

  // Two demo points P and Q on the curve (find them by scanning x)
  const findPoint = (xStart: number): { x: number; y: number } | null => {
    for (let px = xStart; px <= 4; px += 0.05) {
      const rhs = px ** 3 + a * px + b;
      if (rhs > 0) return { x: px, y: Math.sqrt(rhs) };
    }
    return null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const P = useMemo(() => findPoint(-3), [a, b, findPoint]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Q = useMemo(() => findPoint(0.5), [a, b, findPoint]);

  // Point addition P + Q = R  (simplified real arithmetic for illustration)
  const addPoints = (
    p: { x: number; y: number },
    q: { x: number; y: number }
  ): { x: number; y: number } | null => {
    if (Math.abs(p.x - q.x) < 0.001) return null; // vertical line
    const slope = (q.y - p.y) / (q.x - p.x);
    const rx = slope ** 2 - p.x - q.x;
    const ry = -(slope * (rx - p.x) + p.y);
    return { x: rx, y: ry };
  };

  const R = P && Q ? addPoints(P, Q) : null;

  const pSvg = P ? toSvg(P.x, P.y) : null;
  const qSvg = Q ? toSvg(Q.x, Q.y) : null;
  const rSvg = R ? toSvg(R.x, R.y) : null;
  // R' is R reflected on x-axis (before negation) — the intersection point
  const rPrimeSvg = R ? toSvg(R.x, -R.y) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      {isSingular && (
        <p style={{ color: 'var(--warning)', fontSize: '0.78rem', margin: 0 }}>
          ⚠️ Curva singular (discriminante ≈ 0) — no válida para criptografía
        </p>
      )}
      <svg
        width={W}
        height={H}
        style={{ borderRadius: 'var(--radius-md)', background: '#0b0f19', overflow: 'visible' }}
      >
        {/* Grid */}
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(n => {
          const { sx } = toSvg(n, 0);
          const { sy } = toSvg(0, n);
          return (
            <g key={n}>
              <line x1={sx} y1={0} x2={sx} y2={H} stroke="#2a374f" strokeWidth={n === 0 ? 1.5 : 0.5} />
              <line x1={0} y1={sy} x2={W} y2={sy} stroke="#2a374f" strokeWidth={n === 0 ? 1.5 : 0.5} />
              {n !== 0 && (
                <>
                  <text x={sx + 2} y={CY - 4} fill="#2a374f" fontSize={9}>{n}</text>
                  <text x={CX + 3} y={sy + 3} fill="#2a374f" fontSize={9}>{n}</text>
                </>
              )}
            </g>
          );
        })}

        {/* Curve */}
        {!isSingular && upperPoints.length > 1 && (
          <>
            <polyline points={upperPoints.join(' ')} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinejoin="round" />
            <polyline points={lowerPoints.join(' ')} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinejoin="round" />
          </>
        )}

        {/* P + Q = R illustration */}
        {pSvg && qSvg && rPrimeSvg && rSvg && (
          <>
            {/* Line through P and Q extended to curve */}
            <line
              x1={pSvg.sx - 20} y1={pSvg.sy - 10}
              x2={rPrimeSvg.sx + 10} y2={rPrimeSvg.sy + 5}
              stroke="#2563eb" strokeWidth={1} strokeDasharray="4,3" opacity={0.7}
            />
            {/* Vertical reflection line */}
            <line
              x1={rPrimeSvg.sx} y1={rPrimeSvg.sy}
              x2={rSvg.sx} y2={rSvg.sy}
              stroke="#ec4899" strokeWidth={1} strokeDasharray="3,3" opacity={0.8}
            />
            {/* Points */}
            <circle cx={pSvg.sx} cy={pSvg.sy} r={5} fill="#2563eb" />
            <text x={pSvg.sx + 7} y={pSvg.sy - 5} fill="#2563eb" fontSize={11} fontWeight="bold">P</text>
            <circle cx={qSvg.sx} cy={qSvg.sy} r={5} fill="#0ea5e9" />
            <text x={qSvg.sx + 7} y={qSvg.sy - 5} fill="#0ea5e9" fontSize={11} fontWeight="bold">Q</text>
            <circle cx={rPrimeSvg.sx} cy={rPrimeSvg.sy} r={4} fill="#ec4899" opacity={0.6} />
            <text x={rPrimeSvg.sx + 6} y={rPrimeSvg.sy + 4} fill="#ec4899" fontSize={10} opacity={0.7}>P'</text>
            <circle cx={rSvg.sx} cy={rSvg.sy} r={6} fill="#10b981" />
            <text x={rSvg.sx + 7} y={rSvg.sy + 4} fill="#10b981" fontSize={12} fontWeight="bold">R = P+Q</text>
          </>
        )}
      </svg>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
        <span style={{ color: '#3b82f6' }}>●</span> Curva: y² = x³{a >= 0 ? ' + ' : ' '}{a}x{b >= 0 ? ' + ' : ' '}{b}b
        {' · '}
        <span style={{ color: '#2563eb' }}>P</span> + <span style={{ color: '#0ea5e9' }}>Q</span> → reflejar P' → <span style={{ color: '#10b981' }}>R</span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interactive ECDSA demo (Web Crypto — P-256/P-384/P-521)
// ---------------------------------------------------------------------------

type NamedCurve = 'P-256' | 'P-384' | 'P-521';

function EcdsaDemo() {
  const [curve, setCurve] = useState<NamedCurve>('P-256');
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);
  const [pubKeyText, setPubKeyText] = useState('');
  const [message, setMessage] = useState('Firmado con ECDSA — curva elíptica P-256');
  const [signature, setSignature] = useState('');
  const [verifyMsg, setVerifyMsg] = useState('');
  const [verifySig, setVerifySig] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [keyLoading, setKeyLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const bufToHex = (buf: ArrayBuffer) =>
    Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  const hexToBuf = (hex: string) => {
    const b = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) b[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    return b;
  };

  const generateKeys = async () => {
    setKeyLoading(true);
    setSignature(''); setVerifyResult(null);
    const pair = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: curve },
      true, ['sign', 'verify']
    );
    const spki = await crypto.subtle.exportKey('spki', pair.publicKey);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(spki)));
    const lines = b64.match(/.{1,64}/g)?.join('\n') ?? b64;
    setPubKeyText(`-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`);
    setKeyPair(pair);
    setKeyLoading(false);
  };

  const sign = async () => {
    if (!keyPair || !message) return;
    setSignLoading(true);
    const data = new TextEncoder().encode(message);
    const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, keyPair.privateKey, data);
    const hex = bufToHex(sig);
    setSignature(hex);
    setVerifyMsg(message);
    setVerifySig(hex);
    setVerifyResult(null);
    setSignLoading(false);
  };

  const verify = async () => {
    if (!keyPair || !verifyMsg || !verifySig) return;
    setVerifyLoading(true);
    try {
      const data = new TextEncoder().encode(verifyMsg);
      const valid = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        keyPair.publicKey,
        hexToBuf(verifySig),
        data
      );
      setVerifyResult(valid);
    } catch { setVerifyResult(false); }
    setVerifyLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Curve selector */}
      <div>
        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
          Curva NIST
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['P-256', 'P-384', 'P-521'] as NamedCurve[]).map(c => (
            <button key={c} onClick={() => { setCurve(c); setKeyPair(null); setPubKeyText(''); setSignature(''); setVerifyResult(null); }}
              style={{
                padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-md)',
                border: `1px solid ${curve === c ? 'var(--primary)' : 'var(--border-color)'}`,
                backgroundColor: curve === c ? 'rgba(152,202,63,0.15)' : 'transparent',
                color: curve === c ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: curve === c ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.4rem 0 0 0' }}>
          P-256 → 256 bits · equivalente a RSA-3072 · estándar en TLS, JWT, Apple Secure Enclave
        </p>
      </div>

      <Button onClick={generateKeys} disabled={keyLoading} style={{ alignSelf: 'flex-start' }}>
        {keyLoading ? 'Generando...' : keyPair ? 'Regenerar par de claves' : 'Generar par de claves ECDSA'}
      </Button>

      {pubKeyText && (
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Clave pública ({curve})
          </label>
          <pre style={{
            margin: '0.25rem 0 0 0', padding: '0.6rem', backgroundColor: 'var(--bg-color)',
            borderRadius: 'var(--radius-md)', fontSize: '0.7rem', color: 'var(--primary)',
            fontFamily: "'Fira Code', monospace", border: '1px solid rgba(152,202,63,0.3)', overflowX: 'auto',
          }}>{pubKeyText}</pre>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0 0' }}>
            ✦ Esta clave es ~4× más corta que su equivalente RSA con la misma seguridad.
          </p>
        </div>
      )}

      {keyPair && (
        <>
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Mensaje a firmar
            </label>
            <textarea value={message} onChange={e => { setMessage(e.target.value); setSignature(''); setVerifyResult(null); }}
              rows={2} style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'none', fontFamily: 'inherit',
                fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
              }} />
          </div>
          <Button onClick={sign} disabled={signLoading || !message} style={{ alignSelf: 'flex-start' }}>
            {signLoading ? 'Firmando...' : 'Firmar con ECDSA'}
          </Button>
        </>
      )}

      {signature && (
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Firma ECDSA (hex) — mucho más corta que RSA
          </label>
          <pre style={{
            margin: '0.25rem 0 0 0', padding: '0.6rem', backgroundColor: 'var(--bg-color)',
            borderRadius: 'var(--radius-md)', fontSize: '0.72rem', color: '#2563eb',
            wordBreak: 'break-all', whiteSpace: 'pre-wrap',
            fontFamily: "'Fira Code', monospace", border: '1px solid rgba(37,99,235,0.3)',
          }}>{signature}</pre>

          {/* Verify */}
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Mensaje a verificar <span style={{ fontSize: '0.78rem', opacity: 0.7 }}>(modifícalo para ver el fallo)</span>
            </label>
            <textarea value={verifyMsg} onChange={e => { setVerifyMsg(e.target.value); setVerifyResult(null); }}
              rows={2} style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'none', fontFamily: 'inherit',
                fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none', marginBottom: '0.75rem',
              }} />
            <Button onClick={verify} disabled={verifyLoading} variant="secondary" style={{ alignSelf: 'flex-start' }}>
              {verifyLoading ? 'Verificando...' : 'Verificar firma ECDSA'}
            </Button>
          </div>

          {verifyResult !== null && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '0.75rem', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)',
                backgroundColor: verifyResult ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${verifyResult ? '#10b981' : '#ef4444'}`,
                color: verifyResult ? '#10b981' : '#ef4444', fontWeight: 600,
              }}>
              {verifyResult ? '✓ Firma VÁLIDA — autenticidad e integridad confirmadas' : '✗ Firma INVÁLIDA — mensaje alterado o firma incorrecta'}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ECC page
// ---------------------------------------------------------------------------

export function EccPage() {
  const [a, setA] = useState(-3);
  const [b, setB] = useState(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* What is ECC */}
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
          Criptografía de Curvas Elípticas (ECC)
        </h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          La criptografía de curvas elípticas es un campo especializado dentro de la criptografía
          asimétrica. En lugar de basar su seguridad en la factorización de números primos grandes
          (como RSA), se basa en el <strong>problema del logaritmo discreto sobre curvas elípticas</strong>
          — un problema matemáticamente más difícil de resolver, lo que permite obtener{' '}
          <strong>claves mucho más cortas con la misma seguridad</strong>.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {[
            { label: 'RSA-3072', bits: '3072 bits', equiv: 'seguridad ~128 bits', color: '#f97316' },
            { label: 'ECC P-256', bits: '256 bits', equiv: 'seguridad ~128 bits', color: '#10b981' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '0.75rem', backgroundColor: 'var(--panel-bg)',
              borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontWeight: 700, color: item.color }}>{item.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.bits}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.equiv}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Curve visualizer */}
      <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>
          Visualizador Interactivo — y² = x³ + ax + b
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Ajusta los parámetros <strong>a</strong> y <strong>b</strong> para explorar cómo cambia la
          forma de la curva. La operación de <strong>suma de puntos</strong> P + Q = R está
          ilustrada: se traza una recta por P y Q, se busca la intersección P' con la curva, y se
          refleja en el eje X para obtener R.
        </p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {[
            { label: 'a', value: a, setter: setA, min: -5, max: 5 },
            { label: 'b', value: b, setter: setB, min: -5, max: 5 },
          ].map(({ label, value, setter, min, max }) => (
            <div key={label} style={{ flex: 1, minWidth: '160px' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Parámetro <strong style={{ color: 'var(--primary)' }}>{label}</strong></span>
                <strong style={{ color: 'var(--text-primary)' }}>{value}</strong>
              </label>
              <input type="range" min={min} max={max} step={0.5} value={value}
                onChange={e => setter(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.3rem', accentColor: 'var(--primary)' }}
              />
            </div>
          ))}
        </div>

        <CurveVisualizer a={a} b={b} />
      </Card>

      {/* Point addition explanation */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>La operación de "suma" en curvas elípticas</h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          En las curvas elípticas existe una operación especial llamada <strong>suma de puntos</strong>.
          A diferencia de la suma numérica convencional, para sumar dos puntos P y Q:
        </p>
        <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
          <li>Se traza una recta que pase por <span style={{ color: '#2563eb', fontWeight: 600 }}>P</span> y <span style={{ color: '#0ea5e9', fontWeight: 600 }}>Q</span>.</li>
          <li>Esa recta intersecta la curva en un tercer punto <span style={{ color: '#ec4899', fontWeight: 600 }}>P'</span>.</li>
          <li>Se refleja P' sobre el eje X para obtener <span style={{ color: '#10b981', fontWeight: 600 }}>R = P + Q</span>.</li>
          <li>En criptografía se repite esta operación <strong>k veces</strong> (multiplicación escalar: <code>k·P</code>) usando un entero secreto <em>k</em>.</li>
        </ol>
        <div style={{ marginTop: '1rem', padding: '0.9rem', backgroundColor: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
          <strong>El problema difícil:</strong> dado el punto G (base pública) y el punto Q = k·G (clave pública),
          encontrar <em>k</em> (clave privada) es computacionalmente inviable — esto es el{' '}
          <strong>Problema del Logaritmo Discreto en Curvas Elípticas (ECDLP)</strong>.
        </div>
      </Card>

      {/* Real-world applications */}
      <Card>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Aplicaciones en el mundo real</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {[
            {
              icon: '🍎',
              title: 'Apple Secure Enclave',
              desc: 'Chip dedicado que gestiona una clave privada P-256 que nunca abandona el dispositivo — usado en Face ID, Touch ID y Apple Pay.',
              color: '#94a3b8',
            },
            {
              icon: '🏢',
              title: 'Llaves físicas corporativas',
              desc: 'Tokens como YubiKey usan ECDSA para firmar challenges de autenticación sin exponer la clave privada almacenada en el hardware.',
              color: '#2563eb',
            },
            {
              icon: '☁️',
              title: 'AWS Key Management Service',
              desc: 'KMS ofrece claves ECC en módulos HSM certificados. La clave privada nunca sale de la infraestructura de AWS — solo se crean firmas.',
              color: '#f97316',
            },
            {
              icon: '🔒',
              title: 'TLS 1.3 / HTTPS',
              desc: 'La mayoría de conexiones HTTPS modernas usan ECDH (P-256) para el intercambio de claves — reemplazando a RSA por su eficiencia.',
              color: '#10b981',
            },
            {
              icon: '₿',
              title: 'Bitcoin y Ethereum',
              desc: 'Ambas blockchains usan secp256k1 (una curva elíptica específica) para firmar transacciones con ECDSA.',
              color: '#eab308',
            },
            {
              icon: '📱',
              title: 'Signal / WhatsApp',
              desc: 'El protocolo Signal usa Curve25519 (una curva elíptica de alta seguridad) para el intercambio de claves en mensajería cifrada de extremo a extremo.',
              color: '#0ea5e9',
            },
          ].map(item => (
            <div key={item.title} style={{
              padding: '1rem', backgroundColor: 'var(--panel-bg)',
              borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem', fontSize: '0.9rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive ECDSA demo */}
      <Card style={{ borderTop: '3px solid var(--primary)' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
          Demo Interactivo — ECDSA (Firmas Digitales con Curvas Elípticas)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          ECDSA (Elliptic Curve Digital Signature Algorithm) es la versión ECC del RSA-SHA256 que ya
          conoces. Misma seguridad, claves ~10× más cortas. Es el algoritmo detrás de JWT con ES256,
          Bitcoin, y TLS moderno.
        </p>
        <EcdsaDemo />
      </Card>
    </motion.div>
  );
}
