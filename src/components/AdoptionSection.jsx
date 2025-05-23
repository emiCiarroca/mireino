import React, { useState, useEffect } from 'react';
import '../styles/adoption.css';
import horsesData from '../data/horsesData';

function AdoptionSection({ showMessage, onClose, horseName = 'Benito' }) {
  const [mainImage, setMainImage] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [horseData, setHorseData] = useState({
    name: 'Benito',
    age: '',
    breed: '',
    gender: '',
    color: '',
    height: '',
    description: []
  });
  
  useEffect(() => {
    if (horsesData[horseName]) {
      setHorseData({
        name: horseName,
        ...horsesData[horseName]
      });
      setMainImage(horsesData[horseName].mainImage);
    }
  }, [horseName]);
  
  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };
  
  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  const handleAdoptionRequest = () => {
    showMessage(`¡Gracias por tu interés en ${horseName}! Completa los datos de contacto.`, 'success');
    
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 999);
    
    setTimeout(() => {
      closeWithAnimation();
    }, 3000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${horseName} busca hogar`,
        text: `Conoce a ${horseName}, un hermoso caballo en adopción.`,
        url: window.location.href,
      }).then(() => {
        closeWithAnimation();
      }).catch(() => {});
    } else {
      showMessage('Enlace copiado al portapapeles', 'info');
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setTimeout(() => {
            closeWithAnimation();
          }, 3000);
        });
    }
  };

  return (
    <section id="adoption" className={`adoption ${isClosing ? 'closing' : ''}`}>
      <div className="container">
        <div className="adoption-header">
          <h2>Adopta a {horseData.name}</h2>
          <p>{horseData.name} busca un hogar definitivo donde pueda recibir el amor y cuidado que merece. Conoce su historia y ayúdanos a encontrarle una familia.</p>
          <button className="close-adoption" onClick={closeWithAnimation} aria-label="Cerrar">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="horse-grid">
          <div className="horse-gallery">
            <img src={mainImage} alt={horseData.name} className="main-image" />
            <div className="thumbnail-container">
              {horseData.images && horseData.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${horseData.name} thumbnail ${index + 1}`} 
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </div>
          </div>
          
          <div className="horse-info">
            <h3>{horseData.name}</h3>
            
            <div className="horse-details">
              <div className="detail-item">
                <span className="detail-label">Edad:</span>
                <span className="detail-value">{horseData.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Raza:</span>
                <span className="detail-value">{horseData.breed}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sexo:</span>
                <span className="detail-value">{horseData.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Color:</span>
                <span className="detail-value">{horseData.color}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tamaño:</span>
                <span className="detail-value">{horseData.height}</span>
              </div>
            </div>
            
            <div className="horse-description">
              {horseData.description && horseData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="adoption-requirements">
            <h4>Requisitos para adoptar:</h4>
            <ul className="requirements-list">
              <li>Disponer de un espacio adecuado (mínimo 1 hectárea)</li>
              <li>Experiencia previa con caballos</li>
              <li>Posibilidad de visitas periódicas de seguimiento</li>
              <li>Compromiso de atención veterinaria regular</li>
              <li>No destinarlo a competiciones de alto rendimiento</li>
            </ul>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-content">
              "Adoptamos un caballo del refugio hace un año y ha sido una experiencia maravillosa. Estos animales tienen tanto amor para dar y agradecen cada pequeño gesto. El proceso de adopción fue sencillo y el equipo nos guió en cada paso."
            </div>
            <div className="testimonial-author">— María González, adoptante</div>
          </div>
        </div>
        
        <div className="adoption-cta">
          <p>Si estás interesado en darle un hogar a {horseData.name} y cumples con los requisitos, contáctanos. Realizaremos una entrevista y una visita al lugar donde vivirá para asegurarnos de que sea el hogar ideal para él.</p>
          <div className="cta-buttons">
            <a href="#contact" className="cta-btn primary" onClick={handleAdoptionRequest}>Quiero adoptarlo</a>
            <button className="cta-btn secondary" onClick={handleShare}>Compartir</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdoptionSection;