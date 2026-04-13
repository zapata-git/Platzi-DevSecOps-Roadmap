import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { courses } from '../data/courses';
import { CourseTabs } from '../components/layout/CourseTabs';
// Importaremos DiffieHellman y RSA más adelante en el paso 4
import { DiffieHellmanPage } from './DiffieHellmanPage';
import { RsaPage } from './RsaPage';
import { OwaspPage } from './OwaspPage';
import { HashPage } from '../features/hash/HashPage';
import { HmacPage } from '../features/hmac/HmacPage';
import { AesPage } from '../features/aes/AesPage';
import { PrngPage } from '../features/prng/PrngPage';
import { SignPage } from '../features/sign/SignPage';
import { EccPage } from '../features/ecc/EccPage';
import { PkiPage } from '../features/pki/PkiPage';
import { CiberseguridadWebPage } from '../features/ciberseguridad-web/CiberseguridadWebPage';
import { IamTripleAPage } from '../features/ciberseguridad-web/IamTripleAPage';
import { BackendGoWebhooksPage } from '../features/ciberseguridad-web/BackendGoWebhooksPage';
import { MocksTestingPage } from '../features/ciberseguridad-web/MocksTestingPage';
import { DevSecOpsPage } from '../features/ciberseguridad-web/DevSecOpsPage';
import { GithubActionsPage } from '../features/ciberseguridad-web/GithubActionsPage';
import { motion } from 'framer-motion';

export function CoursePage() {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const defaultTab = course?.topics[0]?.id ?? '';
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sincronizar el primer tab activo al cambiar de curso
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTab(course?.topics[0]?.id ?? '');
  }, [courseId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const Icon = course.icon;

  const renderContent = () => {
    if (course.topics.length === 0) {
      return (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <h3>Aún no hay temas interactivos aquí</h3>
          <p>Pronto iremos agregando los ejercicios y laboratorios para este curso.</p>
        </div>
      );
    }

    if (course.id === 'fundamentos-criptografia') {
      if (activeTab === 'diffie-hellman') return <DiffieHellmanPage />;
      if (activeTab === 'rsa') return <RsaPage />;
      if (activeTab === 'hash') return <HashPage />;
      if (activeTab === 'hmac') return <HmacPage />;
      if (activeTab === 'aes') return <AesPage />;
      if (activeTab === 'prng') return <PrngPage />;
      if (activeTab === 'firmas') return <SignPage />;
      if (activeTab === 'ecc') return <EccPage />;
      if (activeTab === 'pki') return <PkiPage />;
    }

    if (course.id === 'owasp-top-10') {
      return <OwaspPage topic={activeTab} />;
    }

    if (course.id === 'ciberseguridad-desarrollo-web') {
      if (activeTab === 'intro-ciberseguridad') return <CiberseguridadWebPage />;
      if (activeTab === 'iam-triple-a') return <IamTripleAPage />;
      if (activeTab === 'backend-go-webhooks') return <BackendGoWebhooksPage />;
      if (activeTab === 'mocks-testing') return <MocksTestingPage />;
      if (activeTab === 'devsecops') return <DevSecOpsPage />;
      if (activeTab === 'github-actions-sec') return <GithubActionsPage />;
    }

    // Default topics catch-all for future scalable courses
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
         Construyendo contenido para el tema: <strong>{activeTab}</strong>
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
          <Icon size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--text-primary)' }}>{course.title}</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{course.description}</p>
        </div>
      </header>

      <CourseTabs tabs={course.topics} activeTab={activeTab} onTabChange={setActiveTab} />

      <div style={{ flexGrow: 1, position: 'relative' }}>
         <motion.div
           key={activeTab || courseId}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.2 }}
         >
           {renderContent()}
         </motion.div>
      </div>
    </div>
  );
}
