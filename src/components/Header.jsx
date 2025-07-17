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

  const handlePopState = useCallback(() => {
    if (location.pathname === '/' && window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

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
    
    if (path.startsWith('/login') || path.startsWith('/admin')) {
      navigate(path);
      setIsMenuOpen(false);
      return;
    }

    if (path === '/logout') {
      logout();
      setIsMenuOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      if (path.startsWith('#')) {
        navigate(`/${path}`);
      } else {
        navigate('/');
      }
      setIsMenuOpen(false);
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      
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
      setIsMenuOpen(false);
    }
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
    }
    setTimeout(() => {
      onCartClick();
    }, 100);
  };

  const headerClass = isMobile && scrolled ? "mobile-scrolled" : "";
  const showMobileNav = isMobile;

  const navItems = [
    { path: '#projects', text: 'Equinos' },
    { path: '#about', text: 'Nosotros' },
    { path: '#services', text: 'Servicios' },
    { path: '#shop', text: 'Tienda' },
    { path: '#contact', text: 'Contacto' },
    { path: user ? '/admin' : '/login', text: user ? 'Admin' : 'Login' },
    { path: 'https://www.instagram.com/mi.reino.por.un.caballo/', text: 'Instagram', external: true },
    { path: 'https://www.facebook.com/mireinoporuncaballoparana', text: 'Facebook', external: true }
  ];

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
                          className="mobile-menu-item"
                        >
                          {item.text}
                        </a>
                      )}
                    </li>
                  ))}
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