import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/header.css';

function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('#');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePopState = useCallback((e) => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path === '/' && hash) {
      // Navegación entre secciones con hash
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setCurrentPath(hash);
    } else if (path !== '/') {
      // Navegación a rutas como /login, /admin, etc.
      navigate(path);
    } else {
      // Volver a la página de inicio (sin hash)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPath('#');
    }
  }, [navigate]);

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
    window.addEventListener("popstate", handlePopState);
    
    updateCurrentPath();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateCurrentPath);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    
    if (path.startsWith('/login') || path.startsWith('/admin') || path.startsWith('/logout')) {
      navigate(path);
      setIsMenuOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (path !== '#') {
          const targetElement = document.querySelector(path);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({ section: path }, '', path);
            setCurrentPath(path);
          }
        }
        setIsMenuOpen(false);
      }, 100);
      return;
    }

    if (path !== currentPath) {
      if (path === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState({ section: 'home' }, '', '/');
      } else {
        const targetElement = document.querySelector(path);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          window.history.pushState({ section: path }, '', path);
        }
      }
      
      setCurrentPath(path);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsMenuOpen(false);
    showMessage('Sesión cerrada correctamente', 'success');
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({ section: '#shop' }, '', '#shop');
      setCurrentPath('#shop');
    }
    setTimeout(() => {
      onCartClick();
    }, 100);
  };

  const headerClass = isMobile && scrolled ? "mobile-scrolled" : "";
  const showMobileNav = isMobile;

  const navItems = [
    { path: '#', text: 'Inicio' },
    { path: '#projects', text: 'Equinos' },
    { path: '#about', text: 'Nosotros' },
    { path: '#services', text: 'Servicios' },
    { path: '#shop', text: 'Tienda' },
    { path: '#contact', text: 'Contacto' },
    { path: user ? '/admin' : '/login', text: user ? 'Admin' : 'Login' },
    { path: 'https://www.instagram.com/mi.reino.por.un.caballo/', text: 'Instagram', external: true },
    { path: 'https://www.facebook.com/mireinoporuncaballoparana', text: 'Facebook', external: true }
  ];

  
  const showMessage = (text, type = 'info') => {
    console.log(`${type}: ${text}`);
  };

  return (
    <>
      <header className={headerClass}>
        <div className="container">
          {!isMobile && (
            <a href="#" className="logo" onClick={(e) => handleNavClick(e, '#')}>
              Mi Reino
            </a>
          )}
          <nav className="desktop-nav">
            <ul className="main-nav">
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className={currentPath === '#projects' ? 'active' : ''}>Equinos</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className={currentPath === '#about' ? 'active' : ''}>Nosotros</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className={currentPath === '#services' ? 'active' : ''}>Servicios</a></li>
              <li><a href="#shop" onClick={(e) => handleNavClick(e, '#shop')} className={currentPath === '#shop' ? 'active' : ''}>Tienda</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className={currentPath === '#contact' ? 'active' : ''}>Contacto</a></li>
              {user ? (
                <>
                  <li className="admin-nav">
                    <a href="/admin" className="admin-link" onClick={(e) => handleNavClick(e, '/admin')}>
                      <i className=""></i> Admin
                    </a>
                  </li>
                  <li className="logout-nav">
                    <a href="/logout" onClick={handleLogout}>
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
              <li className="cart-nav-item">
                <a 
                  href="#shop" 
                  onClick={handleCartClick}
                  className="cart-icon-link"
                  aria-label="Carrito de compras"
                >
                  <i className="fas fa-shopping-cart"></i>
                  {cartCount > 0 && (
                    <span className="cart-count-badge">{cartCount}</span>
                  )}
                </a>
              </li>
              <li className="social-nav social-nav-separator"></li>
              <li className="social-nav">
                <a href="https://www.instagram.com/mi.reino.por.un.caballo/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="social-nav">
                <a href="https://www.facebook.com/mireinoporuncaballoparana" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {showMobileNav && (
        <nav className="mobile-bottom-nav">
          <ul className="mobile-nav-icons">
            <li>
              <a 
                href="#" 
                onClick={(e) => handleNavClick(e, '#')}
                className={currentPath === '#' ? 'active' : ''}
              >
                <i className="nav-icon fas fa-home"></i>
                <span className="nav-text">Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#shop" 
                onClick={handleCartClick}
                className="cart-icon-link"
              >
                <i className="nav-icon fas fa-shopping-cart"></i>
                {cartCount > 0 && (
                  <span className="cart-count-badge">{cartCount}</span>
                )}
                <span className="nav-text">Carrito</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={toggleMenu}
                className={isMenuOpen ? 'active' : ''}
              >
                <i className="nav-icon fas fa-bars"></i>
                <span className="nav-text">Menú</span>
              </a>
            </li>
          </ul>

          {isMenuOpen && (
            <div className="mobile-menu-dropdown">
              <div className="mobile-menu-content">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.path}>
                      {item.external ? (
                        <a 
                          href={item.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mobile-menu-item"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <a 
                          href={item.path} 
                          onClick={(e) => handleNavClick(e, item.path)}
                          className={`mobile-menu-item ${currentPath === item.path ? 'active' : ''}`}
                        >
                          {item.text}
                        </a>
                      )}
                    </li>
                  ))}
                  {user && (
                    <li>
                      <a 
                        href="#logout" 
                        onClick={handleLogout}
                        className="mobile-menu-item"
                      >
                        Cerrar Sesión
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default Header;