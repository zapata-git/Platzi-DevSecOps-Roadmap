import { motion } from 'framer-motion';

export function WelcomeDashboard() {
  return (
    <div style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ marginBottom: '2rem' }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
           <path d="m9 12 2 2 4-4"/>
        </svg>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'var(--text-primary)' }}
      >
        Ruta <span style={{ color: 'var(--primary)' }}>Seguridad Web & API</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}
      >
        Has convertido esta app en una poderosa plataforma de aprendizaje. 
        <br />Selecciona <strong>Fundamentos de Criptografía</strong> en el menú lateral para interactuar con Diffie-Hellman y RSA.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ 
          marginTop: '3rem', 
          padding: '1.5rem', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid var(--primary)', 
          borderRadius: 'var(--radius-lg)' 
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>Próximos Pasos</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          A medida que vayas completando los cursos, pasaremos los temas aquí para programar los laboratorios e interacciones. ¡El límite es tu código!
        </p>
      </motion.div>
    </div>
  );
}
