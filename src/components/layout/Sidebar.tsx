import { NavLink } from 'react-router-dom';
import { courses } from '../../data/courses';

export function Sidebar() {
  return (
    <div style={{
      width: '320px',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)'}}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)' }}>Ruta Ciberseguridad</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Seguridad Web & API</span>
        </div>
      </div>

      <nav style={{ padding: '1rem 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <li key={course.id}>
                <NavLink
                  to={`/curso/${course.id}`}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    textDecoration: 'none',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--sidebar-active)' : 'transparent',
                    borderLeft: `4px solid ${isActive ? 'var(--sidebar-active-border)' : 'transparent'}`,
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400
                  })}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--border-color)',
                    marginRight: '1rem',
                    color: 'inherit'
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.title.replace('Curso de ', '').replace('Taller de ', '')}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
         <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            &larr; Volver a Dashbord
         </NavLink>
      </div>
    </div>
  );
}
