import React from 'react';
import '../styles/header.css';

function Header() {
  return (
    <header>
      <div className="container">
        <a href="#" className="logo">Mi Reino</a>
        <nav>
          <ul>
            <li><a href="#projects">Ellos</a></li>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#shop">Tienda</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
          <a href="https://www.instagram.com/mi.reino.por.un.caballo/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/mireinoporuncaballoparana" target="_blank" rel="noopener noreferrer" className="social-icon">
             <i className="fab fa-facebook-f"></i>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
