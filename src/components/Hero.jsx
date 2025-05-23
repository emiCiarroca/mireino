import '../styles/hero.css'
import HeroImage from "../assets/imagenes/Hero.webp";

const Hero = ({ showMessage }) => {
  const handleViewWorkClick = (e) => {
    e.preventDefault();
    showMessage('Explorando nuestros proyectos...', 'success');
    
    setTimeout(() => {
      document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <section className="hero">
      <div className="hero-banner" style={{ backgroundImage: `url(${HeroImage})` }}></div>

      <div className="container">
        <div className="hero-content">
          <h1>Cuidamos, sanamos y ofrecemos amor: sé parte de la transformación</h1>
          <p>
            Nuestra ONG se dedica a rescatar caballos maltratados, brindándoles un espacio seguro
            donde pueden sanar tanto física como emocionalmente.
          </p>
          <a href="#services" className="btn" onClick={handleViewWorkClick}>
            Conoce los equinos activos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;