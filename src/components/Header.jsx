import React, { useEffect, useState } from 'react';
import '../styles/header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "vertical" : "horizontal"}>
      <div className="container">
        <a href="#" className="logo">
          {scrolled ? <i className="fas fa-home"></i> : "Mi Reino"}
        </a>
        <nav>
          <ul>
            {scrolled ? (
              <>
                <li><a href="#projects"><i className="fas fa-horse"></i></a></li>
                <li><a href="#about"><i className="fas fa-users"></i></a></li>
                <li><a href="#services"><i className="fas fa-hands-helping"></i></a></li>
                <li><a href="#shop"><i className="fas fa-store"></i></a></li>
                <li><a href="#contact"><i className="fas fa-envelope"></i></a></li>
              </>
            ) : (
              <>
                <li><a href="#projects">Ellos</a></li>
                <li><a href="#about">Nosotros</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="#shop">Tienda</a></li>
                <li><a href="#contact">Contacto</a></li>
              </>
            )}
          </ul>
          <div className="social-icons">
            <a href="https://www.instagram.com/mi.reino.por.un.caballo/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/mireinoporuncaballoparana" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;