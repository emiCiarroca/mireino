import React, { useState } from 'react';
import '../styles/adoption.css';
import Benito1 from "../assets/imagenes/Benito.webp"; 

function AdoptionSection({ showMessage, onClose }) {
  const [mainImage, setMainImage] = useState(Benito1);
  const [isClosing, setIsClosing] = useState(false);
  
  // Incorporar imágenes webp
  const images = [
    Benito1,
    Benito1, // Reemplazar con otra imagen
    Benito1, // Reemplazar con otra imagen
    Benito1  // Reemplazar con otra imagen
  ];
  
  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };
  
  // Función para cerrar con animación
  const closeWithAnimation = () => {
    setIsClosing(true);
    // Esperar a que termine la animación antes de cerrar realmente
    setTimeout(() => {
      onClose();
    }, 500); // Duración de la animación
  };
  
  const handleAdoptionRequest = () => {
    showMessage('¡Gracias por tu interés! Completa los datos de contacto.', 'success');
    
    // Redirigir a la sección de contacto
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // Usar setTimeout para que el mensaje se muestre antes de la redirección
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 999); // Tiempo de espera de la notificación
    }
    
    // Cerrar la sección después de mostrar el mensaje y redirigir
    setTimeout(() => {
      closeWithAnimation();
    }, 3000);
  };
  
  const handleShare = () => {
    // Lógica para compartir
    if (navigator.share) {
      navigator.share({
        title: 'Benito busca hogar',
        text: 'Conoce a Benito, un hermoso caballo en adopción.',
        url: window.location.href,
      }).then(() => {
        // Cerrar después de compartir exitosamente
        closeWithAnimation();
      }).catch(() => {
        // Si hay error o el usuario cancela, no cerramos
      });
    } else {
      showMessage('Enlace copiado al portapapeles', 'info');
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          // Cerrar después de copiar al portapapeles
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
          <h2>Adopta a Benito</h2>
          <p>Benito busca un hogar definitivo donde pueda recibir el amor y cuidado que merece. Conoce su historia y ayúdanos a encontrarle una familia.</p>
        </div>
        
        <div className="horse-grid">
          {/* Cuadrante superior izquierdo: Galería de imágenes */}
          <div className="horse-gallery">
            <img src={mainImage} alt="Benito" className="main-image" />
            <div className="thumbnail-container">
              {images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Benito thumbnail ${index + 1}`} 
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </div>
          </div>
          
          {/* Cuadrante superior derecho: Información del caballo */}
          <div className="horse-info">
            <h3>Benito</h3>
            
            <div className="horse-details">
              <div className="detail-item">
                <span className="detail-label">Edad:</span>
                <span className="detail-value">7 años</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Raza:</span>
                <span className="detail-value">Criollo</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sexo:</span>
                <span className="detail-value">Macho castrado</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Color:</span>
                <span className="detail-value">Castaño</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tamaño:</span>
                <span className="detail-value">1.55 m</span>
              </div>
            </div>
            
            <div className="horse-description">
              <p>Benito es un caballo con un carácter noble y tranquilo. Fue rescatado hace 2 años de una situación de maltrato y desde entonces ha progresado enormemente. Es amigable con otros caballos y se lleva bien con personas de todas las edades.</p>
              <p>Está entrenado para montar y disfruta de caminatas tranquilas. Es especialmente bueno con niños y principiantes debido a su temperamento dócil.</p>
            </div>
          </div>
          
          {/* Cuadrante inferior izquierdo: Requisitos de adopción */}
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
          
          {/* Cuadrante inferior derecho: Testimonial */}
          <div className="testimonial">
            <div className="testimonial-content">
              "Adoptamos un caballo del refugio hace un año y ha sido una experiencia maravillosa. Estos animales tienen tanto amor para dar y agradecen cada pequeño gesto. El proceso de adopción fue sencillo y el equipo nos guió en cada paso."
            </div>
            <div className="testimonial-author">— María González, adoptante</div>
          </div>
        </div>
        
        <div className="adoption-cta">
          <p>Si estás interesado en darle un hogar a Benito y cumples con los requisitos, contáctanos. Realizaremos una entrevista y una visita al lugar donde vivirá para asegurarnos de que sea el hogar ideal para él.</p>
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