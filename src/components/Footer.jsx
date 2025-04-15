import { useState } from 'react'
import '../styles/footer.css'

const Footer = ({ showMessage }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (email) {
      showMessage(`Te has suscrito correctamente con el email: ${email}`, 'success');
      setEmail('');
    } else {
      showMessage('Por favor ingresa tu email para suscribirte.', 'error');
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Mi Reino Por Un Caballo</h3>
            <ul>
              <li><a href="#about">Nosotros</a></li>
              <li><a href="#projects">Ellos</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#shop">Tienda</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Servicios</h3>
            <ul>
              <li><a href="#">Rescate</a></li>
              <li><a href="#">Rehabilitación</a></li>
              <li><a href="#">Adopción</a></li>
              <li><a href="#">Voluntariado</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Tienda</h3>
            <ul>
              <li><a href="#shop">Todos los Productos</a></li>
              <li><a href="#shop">Ropa</a></li>
              <li><a href="#shop">Accesorios</a></li>
              <li><a href="#shop">Suministros</a></li>
              <li><a href="#shop">Libros</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Donaciones Mensuales</h3>
            <p>Si queres ayudar con montos fijos por mes dejanos tu correo y nosotros te contactamos</p>
            <form onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Tu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Mi Reino Por Un Caballo. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="#">Instagram</a>           
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;