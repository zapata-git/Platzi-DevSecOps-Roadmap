import { type LucideIcon, KeyRound, ShieldAlert, Code, ShieldCheck, Lock, UserCheck, FileJson, Server, LayoutTemplate, Shield } from 'lucide-react';

export interface CourseData {
  id: string;
  title: string;
  description: string;
  icon: any; // We'll use Lucide icons dynamically
  topics: { id: string; label: string }[];
}

// Data extracted from the image provided by the user
export const courses: CourseData[] = [
  {
    id: 'fundamentos-criptografia',
    title: 'Curso de Fundamentos de Criptografía',
    description: 'Entiende los pilares de la seguridad de la información. Confidencialidad, Integridad y Autenticidad mediante matemáticas.',
    icon: KeyRound,
    topics: [
      { id: 'diffie-hellman', label: 'Diffie-Hellman' },
      { id: 'rsa', label: 'Algoritmo RSA' },
      { id: 'hash', label: 'Hashing' },
      { id: 'hmac', label: 'HMAC' },
      { id: 'aes', label: 'AES Cifrado' },
      { id: 'prng', label: 'Números Aleatorios' },
      { id: 'firmas', label: 'Firmas Digitales' },
      { id: 'ecc', label: 'Curvas Elípticas' },
      { id: 'pki', label: 'PKI y Certificados' },
    ]
  },
  {
    id: 'owasp-top-10',
    title: 'Curso de OWASP Top 10: Riesgos en Aplicaciones',
    description: 'Conoce los 10 riesgos de seguridad más críticos y cómo mitigarlos.',
    icon: ShieldAlert,
    topics: [
      { id: 'intro-owasp', label: '¿Qué es OWASP?' },
      { id: 'a01-broken-access-control', label: 'A01 · Acceso Roto' },
      { id: 'a02-cryptographic-failures', label: 'A02 · Criptografía' },
      { id: 'a03-injection', label: 'A03 · Inyección' },
      { id: 'a04-insecure-design', label: 'A04 · Diseño Inseguro' },
      { id: 'a05-security-misconfiguration', label: 'A05 · Mala Configuración' },
      { id: 'a06-vulnerable-components', label: 'A06 · Componentes Vulnerables' },
      { id: 'a07-auth-failures', label: 'A07 · Autenticación' },
      { id: 'a08-integrity-failures', label: 'A08 · Integridad' },
      { id: 'a09-logging-failures', label: 'A09 · Registro y Monitoreo' },
      { id: 'a10-ssrf', label: 'A10 · SSRF' }
    ]
  },
  {
    id: 'ciberseguridad-desarrollo-web',
    title: 'Curso de Ciberseguridad para Desarrollo Web',
    description: 'Mejores prácticas para proteger tus aplicaciones Frontend y Backend.',
    icon: Code,
    topics: [
      { id: 'intro-ciberseguridad', label: 'El Factor Humano' },
      { id: 'iam-triple-a', label: 'IAM y Triple A' },
      { id: 'backend-go-webhooks', label: 'Backend Go + Webhooks' },
      { id: 'mocks-testing', label: 'Mocks y Testing' },
      { id: 'devsecops', label: 'DevSecOps' },
      { id: 'github-actions-sec', label: 'GitHub Actions' },
    ]
  },
  {
    id: 'oauth2-openid',
    title: 'Curso de OAuth 2.0 y OpenID Connect',
    description: 'Flujos de Autenticación y Casos de Estudio en arquitecturas modernas.',
    icon: ShieldCheck,
    topics: []
  },
  {
    id: 'auth0-implementacion',
    title: 'Curso de Auth0: Implementación de Autenticación',
    description: 'Aprende a integrar Auth0 para delegar la autenticación de manera segura.',
    icon: Shield,
    topics: []
  },
  {
    id: 'secretos-javascript',
    title: 'Taller de Secretos Ocultos de JavaScript',
    description: 'Protección de Clases y Objetos a nivel lenguaje.',
    icon: UserCheck, // closest visually or stylistically
    topics: []
  },
  {
    id: 'nextjs-owasp',
    title: 'Curso de Next.js: Seguridad Web con OWASP',
    description: 'Refuerza aplicaciones SSR/SSG hechas en Next.js.',
    icon: FileJson,
    topics: []
  },
  {
    id: 'nextjs-autenticacion',
    title: 'Curso de Next.js: Autenticación',
    description: 'Implementación de sesiones y tokens en el ecosistema React/Next.',
    icon: Lock,
    topics: []
  },
  {
    id: 'nodejs-passport',
    title: 'Curso de Backend con Node.js: Passport.js y JWT',
    description: 'Seguridad en API RESTful utilizando librerías estándar en Node.',
    icon: Server,
    topics: []
  },
  {
    id: 'nestjs-passport',
    title: 'Curso de NestJS: Autenticación con Passport y JWT',
    description: 'Módulos y Guards empresariales en el framework NestJS.',
    icon: Server,
    topics: []
  },
  {
    id: 'angular-auth',
    title: 'Curso de Autenticación con Angular',
    description: 'Asegurando clientes robustos SPA mediante interceptores.',
    icon: LayoutTemplate,
    topics: []
  },
  {
    id: 'spring-security',
    title: 'Curso de Java Spring Security',
    description: 'Autenticación y Seguridad Web robusta en el ecosistema Enterprise de Java.',
    icon: ShieldCheck,
    topics: []
  }
];
