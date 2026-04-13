import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '2rem' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}
      >
        Explorador de <span style={{ color: 'var(--primary)' }}>Criptografía</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', textAlign: 'center', maxWidth: '600px' }}
      >
        Aprende paso a paso cómo funcionan los algoritmos de criptografía asimétrica más importantes del mundo a través de visualizaciones interactivas.
      </motion.p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/dh')}
          style={{ cursor: 'pointer' }}
        >
          <Card style={{ width: '300px', height: '100%', borderColor: 'var(--primary)', borderWidth: '2px' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Diffie-Hellman</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Aprende cómo dos partes pueden acordar un secreto compartido a través de un canal inseguro.
            </p>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/rsa')}
          style={{ cursor: 'pointer' }}
        >
          <Card style={{ width: '300px', height: '100%', borderColor: 'var(--secondary)', borderWidth: '2px' }}>
            <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem', marginTop: 0 }}>RSA</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Explora la generación de llaves públicas y privadas, y cifra mensajes utilizando factorización de primos.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
