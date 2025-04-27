import React, { useEffect, useState } from 'react';
import '../styles/header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('#');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Detectar la sección actual y manejar la navegación
    const updateCurrentPath = () => {
      const hash = window.location.hash || '#';
      setCurrentPath(hash);
      
      // Si no hay hash o es solo #, ir al inicio
      if (!window.location.hash || window.location.hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Inicializar y configurar listeners
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", updateCurrentPath);
    
    // Inicializar el path actual
    updateCurrentPath();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateCurrentPath);
    };
  }, []);

  // Manejador para los enlaces del menú que actualiza la URL
  const handleNavClick = (e, hash) => {
    // Solo actualizar si es diferente a la sección actual
    if (hash !== currentPath) {
      // Actualizar el historial del navegador
      window.history.pushState(null, '', hash);
      setCurrentPath(hash);
    }
  };

  // Determina la clase para el header
  const headerClass = isMobile && scrolled ? "mobile-scrolled" : "";
  const showMobileNav = isMobile && scrolled;

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
      
      {/* Barra de navegación móvil fija en la parte inferior */}
      {showMobileNav && (
        <nav className="mobile-bottom-nav">
          <ul className="mobile-nav-icons">
            <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}><i className="fas fa-horse"></i></a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}><i className="fas fa-users"></i></a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}><i className="fas fa-hands-helping"></i></a></li>
            <li><a href="#shop" onClick={(e) => handleNavClick(e, '#shop')}><i className="fas fa-store"></i></a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}><i className="fas fa-envelope"></i></a></li>
            <li>
              <a href="https://www.instagram.com/mi.reino.por.un.caballo/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/mireinoporuncaballoparana" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;