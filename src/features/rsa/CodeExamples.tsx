import { useState } from 'react';
import { Card } from '../../components/ui/Card';

const EXAMPLES = {
  nodejs: {
    label: 'Node.js (Built-in Crypto)',
    code: `import crypto from 'crypto';

// 1. Generación de Llaves
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 2. Cifrado (con Llave Pública)
const mensaje = "ContraseñaUltraSecreta!";
const cifrado = crypto.publicEncrypt(publicKey, Buffer.from(mensaje));
console.log("Cifrado base64:", cifrado.toString('base64'));

// 3. Descifrado (con Llave Privada)
const descifrado = crypto.privateDecrypt(privateKey, cifrado);
console.log("Descifrado:", descifrado.toString());`
  },
  python: {
    label: 'Python (PyCryptodome)',
    code: `from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# 1. Generación de Llaves
key = RSA.generate(2048)
private_key = key.export_key()
public_key = key.publickey().export_key()

# 2. Cifrado (con Llave Pública)
mensaje = b"ContrasenaUltraSecreta!"
cipher_rsa = PKCS1_OAEP.new(RSA.import_key(public_key))
cifrado = cipher_rsa.encrypt(mensaje)

# 3. Descifrado (con Llave Privada)
cipher_rsa_priv = PKCS1_OAEP.new(RSA.import_key(private_key))
descifrado = cipher_rsa_priv.decrypt(cifrado)
print(descifrado.decode('utf-8'))`
  },
  webcrypto: {
    label: 'JavaScript (Web Crypto API)',
    code: `// 1. Generación de Llaves
const keyPair = await window.crypto.subtle.generateKey(
  { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
  true,
  ["encrypt", "decrypt"]
);

// 2. Cifrado
const mensaje = new TextEncoder().encode("ContraseñaSecreta!");
const cifrado = await window.crypto.subtle.encrypt(
  { name: "RSA-OAEP" },
  keyPair.publicKey,
  mensaje
);

// 3. Descifrado
const descifrado = await window.crypto.subtle.decrypt(
  { name: "RSA-OAEP" },
  keyPair.privateKey,
  cifrado
);
console.log(new TextDecoder().decode(descifrado));`
  }
};

export function CodeExamples() {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof EXAMPLES>('nodejs');

  return (
    <Card style={{ marginTop: '2rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           👨‍💻 Ejemplos de Código Real
        </h3>
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as keyof typeof EXAMPLES)}
          style={{
            padding: '0.5rem',
            backgroundColor: 'var(--panel-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}
        >
          {Object.entries(EXAMPLES).map(([key, example]) => (
            <option key={key} value={key}>{example.label}</option>
          ))}
        </select>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Aunque viste los pasos matemáticos "a mano", en un entorno de producción NUNCA debes implementar RSA por tu cuenta. Siempre usa las librerías establecidas del lenguaje:
      </p>

      <div style={{ position: 'relative' }}>
        <pre style={{ 
          backgroundColor: '#000', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-md)', 
          overflowX: 'auto',
          margin: 0,
          border: '1px solid var(--panel-bg-hover)'
        }}>
          <code style={{ color: '#a5b4fc', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {EXAMPLES[selectedLanguage].code}
          </code>
        </pre>
      </div>
    </Card>
  );
}
