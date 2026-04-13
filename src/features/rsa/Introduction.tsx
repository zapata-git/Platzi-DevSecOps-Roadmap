import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { Tooltip } from '../../components/ui/Tooltip';

interface Props {
  onNext: () => void;
}

export function Introduction({ onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>El Algoritmo RSA</h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Mientras Diffie-Hellman sirve para acordar una clave juntos, <strong>RSA funciona sin que la otra persona tenga que hacer nada.</strong> Tú simplemente compartes tu "buzón público", y cualquiera puede enviarte mensajes ahí de forma segura.
        </p>
      </Card>

      <Card style={{ borderColor: 'var(--secondary)', borderWidth: '1px' }}>
        <h3 style={{ color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🔒 El Truco del Candado (Analogía)
        </h3>
        
        <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
          <li>
            Tú fabricas un montón de candados abiertos y los <Tooltip text="Tu Llave Pública (N, E)">repartes al público</Tooltip>. Pero te quedas con la <strong>única llave</strong> que los abre.
          </li>
          <li>
            Si alguien te quiere contar un secreto, pone el mensaje en una caja y <Tooltip text="El Cifrado Matemático: M^E mod N">le pone uno de tus candados abiertos</Tooltip> y lo cierra.
          </li>
          <li>
            ¡Clack! Una vez cerrado, <strong>nadie, ni siquiera el que mandó el mensaje</strong>, puede volver a abrir la caja.
          </li>
          <li>
            Solo tú, con tu <Tooltip text="Tu Llave Privada generada a partir de los primos P y Q (Llave D)">llavesita secreta original</Tooltip>, puedes abrir todos esos candados y leer los mensajes.
          </li>
        </ol>

        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--panel-bg-hover)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--secondary)' }}>
           <strong>💡 El truco fundamental matemático:</strong> RSA usa números primos altísimos. Es facilísimo multiplicar dos primos (cerrar el candado), pero sin conocer los primos originales, es computacionalmente imposible para un hacker "desarmar" el número resultante (abrir la caja).
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button onClick={onNext} variant="primary" style={{ backgroundColor: 'var(--secondary)' }}>
          Generar Llaves RSA &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
