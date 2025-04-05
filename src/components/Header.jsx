import '../styles/header.css'

const Header = () => {
  return (
    <header>
      <div className="container">
        <a href="#" className="logo">Mi Reino Por Un Caballo</a>
        <nav>
          <ul>
            <li><a href="#work">Ellos</a></li>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#shop">Tienda</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
