import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('#');
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const updateCurrentPath = () => {
      const hash = window.location.hash || '#';
      setCurrentPath(hash);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", updateCurrentPath);
    
    updateCurrentPath();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateCurrentPath);
    };
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    
    // Rutas especiales (login, admin, logout)
    if (path.startsWith('/login') || path.startsWith('/admin')) {
      navigate(path);
      return;
    }

    if (path === '/logout') {
      logout();
      return;
    }

    // Si no estamos en la home, redirigir a home con el hash
    if (location.pathname !== '/') {
      if (path.startsWith('#')) {
        navigate(`/${path}`);
      } else {
        navigate('/');
      }
      return;
    }

    // Manejo normal para la home
    if (path !== currentPath) {
      window.history.pushState(null, '', path);
      const targetElement = path === '#' 
        ? document.body 
        : document.querySelector(path);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
      setCurrentPath(path);
    }
  };

  const headerClass = isMobile && scrolled ? "mobile-scrolled" : "";
  const showMobileNav = isMobile;

  const navItems = [
    { path: '#projects', icon: 'fas fa-horse', text: 'Equinos' },
    { path: '#about', icon: 'fas fa-users', text: 'Nosotros' },
    { path: '#services', icon: 'fas fa-hands-helping', text: 'Servicios' },
    { path: '#shop', icon: 'fas fa-store', text: 'Tienda' },
    { path: '#contact', icon: 'fas fa-envelope', text: 'Contacto' }
  ];

  return (
    <>
      <header className={headerClass}>
        <div className="container">
          <a href="#" className="logo" onClick={(e) => handleNavClick(e, '#')}>
            Mi Reino
          </a>
          <nav className="desktop-nav">
            <ul className="main-nav">
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Equinos</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>Nosotros</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Servicios</a></li>
              <li><a href="#shop" onClick={(e) => handleNavClick(e, '#shop')}>Tienda</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contacto</a></li>
              {user ? (
                <>
                  <li className="admin-nav">
                    <a href="/admin" className="admin-link" onClick={(e) => handleNavClick(e, '/admin')}>
                      <i className=""></i> Admin
                    </a>
                  </li>
                  <li className="logout-nav">
                    <a href="/logout" onClick={(e) => handleNavClick(e, '/logout')}>
                      <i className=""></i> Salir
                    </a>
                  </li>
                </>
              ) : (
                <li className="login-nav">
                  <a href="/login" onClick={(e) => handleNavClick(e, '/login')}>
                    <i className=""></i> Login
                  </a>
                </li>
              )}
              <li className="social-nav">
                <div className="social-icons">
                  <a href="https://www.instagram.com/mi.reino.por.un.caballo/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.facebook.com/mireinoporuncaballoparana" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {showMobileNav && (
        <nav className="mobile-bottom-nav">
          <ul className="mobile-nav-icons">
            {navItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={currentPath === item.path ? 'active' : ''}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.text}</span>
                </a>
              </li>
            ))}
            <li>
              <a 
                href={user ? '/admin' : '/login'} 
                onClick={(e) => handleNavClick(e, user ? '/admin' : '/login')}
                className={currentPath === (user ? '/admin' : '/login') ? 'active' : ''}
              >
                <i className={`nav-icon ${user ? 'fas fa-lock' : 'fas fa-sign-in-alt'}`}></i>
                <span className="nav-text">{user ? 'Admin' : 'Login'}</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;