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
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Diffie-Hellman</h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Imagina que necesitas acordar una <strong>contraseña secreta</strong> con un amigo al otro lado del mundo, pero todas sus comunicaciones pueden ser escuchadas por un espía. Aquí es donde entra Diffie-Hellman.
        </p>
      </Card>

      <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🎨 El Truco de la Pintura (Analogía)
        </h3>
        
        <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
          <li>
            Ambos acuerdan en público un <Tooltip text="En matemáticas: Modulo (P) y Generador (G)">color de pintura base</Tooltip> (ej. Amarillo).
          </li>
          <li>
            Cada uno escoge un <Tooltip text="Su Llave Privada (A o B) que nunca comparten.">color secreto</Tooltip> propio (Tú: Rojo, Tu amigo: Azul).
          </li>
          <li>
            Mezclan el color secreto con la base (Amarillo + Rojo = Naranja) y se envían esa <Tooltip text="Sus Llaves Públicas (A_pub y B_pub)">mezcla pública</Tooltip>.
          </li>
          <li>
            Finalmente, tomas la mezcla que recibiste (Amarillo + Azul) y le agregas de nuevo tu color secreto (Rojo). Tu amigo hace lo mismo. ¡Ambos terminan con exactamente el <Tooltip text="El Secreto Compartido Computado (S)">mismo color marrón secreto</Tooltip>!
          </li>
        </ol>

        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--panel-bg-hover)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
           <strong>💡 El truco fundamental:</strong> Es fácil mezclar pintura (multiplicación), pero es <em>casi imposible</em> para un espía mirar el color "Naranja" público y adivinar de qué colores partió (el problema del logaritmo discreto).
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button onClick={onNext} variant="primary">
          Comenzar Experimento Matemático &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
