import '../styles/about.css';
import logoImage from '../assets/imagenes/logo2.webp'; // Importamos la imagen

const AboutSection = ({ showMessage }) => {
  const handleGetInTouchClick = (e) => {
    e.preventDefault();
    showMessage('Vamos a contactar...', 'info');
    
    setTimeout(() => {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img src={logoImage} alt="Logo del Reino" className="about-logo" />
          </div>
          <div className="about-text">
            <h2>Nosotros</h2>
            <p>A través de atención veterinaria y cuidados especializados, trabajamos para restaurar su bienestar. Una vez recuperados, buscamos hogares amorosos donde puedan vivir plenamente.</p>
            <p>Sin fines de lucro, dependemos exclusivamente de la generosidad de ciudadanos solidarios que deseen ayudar en esta noble causa. Juntos, transformamos vidas y damos a estos caballos la oportunidad que merecen.</p>
            <a href="#contact" className="btn" onClick={handleGetInTouchClick}>Donaciones</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
