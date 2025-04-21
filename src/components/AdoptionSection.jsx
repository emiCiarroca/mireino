import React, { useState, useEffect } from 'react';
import '../styles/adoption.css';

// Importación de imágenes
import Benito1 from "../assets/imagenes/Benito.webp";
import Emilce1 from "../assets/imagenes/Emilce.webp";
import Eros1 from "../assets/imagenes/Eros.webp";
import Eva1 from "../assets/imagenes/Eva.webp";
import Igor1 from "../assets/imagenes/Igor.webp";
import Ivana1 from "../assets/imagenes/Ivana.webp";
import Jacinto1 from "../assets/imagenes/Jacinto.webp";
import Magnum1 from "../assets/imagenes/Magnum.webp";
import Salome1 from "../assets/imagenes/Salome.webp";
import Torio1 from "../assets/imagenes/Torio.webp";
import Zeus1 from "../assets/imagenes/Zeus.webp";

function AdoptionSection({ showMessage, onClose, horseName = 'Benito' }) {
  const [mainImage, setMainImage] = useState(Benito1);
  const [isClosing, setIsClosing] = useState(false);
  const [horseData, setHorseData] = useState({
    name: 'Benito',
    age: '7 años',
    breed: 'Criollo',
    gender: 'Macho castrado',
    color: 'Castaño',
    height: '1.55 m',
    description: [
      'Benito es un caballo con un carácter noble y tranquilo. Fue rescatado hace 2 años de una situación de maltrato y desde entonces ha progresado enormemente. Es amigable con otros caballos y se lleva bien con personas de todas las edades.',
      'Está entrenado para montar y disfruta de caminatas tranquilas. Es especialmente bueno con niños y principiantes debido a su temperamento dócil.'
    ]
  });
  
  // Datos de todos los caballos
  const horsesData = {
    Benito: {
      mainImage: Benito1,
      images: [Benito1, Benito1, Benito1, Benito1],
      age: '7 años',
      breed: 'Criollo',
      gender: 'Macho castrado',
      color: 'Castaño',
      height: '1.55 m',
      description: [
        'Benito es un caballo con un carácter noble y tranquilo. Fue rescatado hace 2 años de una situación de maltrato y desde entonces ha progresado enormemente. Es amigable con otros caballos y se lleva bien con personas de todas las edades.',
        'Está entrenado para montar y disfruta de caminatas tranquilas. Es especialmente bueno con niños y principiantes debido a su temperamento dócil.'
      ]
    },
    Emilce: {
      mainImage: Emilce1,
      images: [Emilce1, Emilce1, Emilce1, Emilce1],
      age: '2 años',
      breed: 'Mestiza',
      gender: 'Hembra',
      color: 'Bayo',
      height: '1.45 m',
      description: [
        'Emilce es una potranca juguetona y curiosa. Aprende con rapidez y se adapta muy bien a nuevos entornos y personas.',
        'Necesita un hogar donde pueda seguir desarrollando su potencial con entrenamiento adecuado y mucho espacio para jugar y correr.'
      ]
    },
    Eros: {
      mainImage: Eros1,
      images: [Eros1, Eros1, Eros1, Eros1],
      age: '6 años',
      breed: 'Percherón cruzado',
      gender: 'Macho',
      color: 'Negro',
      height: '1.70 m',
      description: [
        'Eros es un caballo de gran porte pero con un carácter muy dócil. Es ideal para familias con experiencia en el cuidado equino.',
        'Debido a su tamaño, requiere espacio amplio y una alimentación adecuada. Es perfecto para paseos y trabajos ligeros.'
      ]
    },
    Eva: {
      mainImage: Eva1,
      images: [Eva1, Eva1, Eva1, Eva1],
      age: '3 años',
      breed: 'Árabe-Criollo',
      gender: 'Hembra',
      color: 'Tordillo',
      height: '1.50 m',
      description: [
        'Eva es una yegua elegante y atenta. Tiene un gran potencial para actividades ecuestres recreativas una vez se adapte a su nuevo hogar.',
        'Es algo nerviosa con extraños al principio, pero gana confianza rápidamente con un manejo adecuado y cariñoso.'
      ]
    },
    Igor: {
      mainImage: Igor1,
      images: [Igor1, Igor1, Igor1, Igor1],
      age: '1 año',
      breed: 'Cuarto de Milla',
      gender: 'Macho',
      color: 'Alazán',
      height: '1.40 m (en desarrollo)',
      description: [
        'Igor es un potrillo muy social que disfruta tanto del contacto humano como de la compañía de otros caballos.',
        'Está en pleno desarrollo, por lo que necesita una alimentación adecuada y espacio para jugar y crecer saludablemente.'
      ]
    },
    Ivana: {
      mainImage: Ivana1,
      images: [Ivana1, Ivana1, Ivana1, Ivana1],
      age: '5 años',
      breed: 'Appaloosa',
      gender: 'Hembra',
      color: 'Moteado',
      height: '1.52 m',
      description: [
        'Ivana es excelente con niños, muy gentil y paciente. Es perfecta para terapias asistidas con caballos debido a su temperamento.',
        'Ha recibido entrenamiento básico y responde muy bien a las órdenes. Es una compañera ideal para una familia amorosa.'
      ]
    },
    Jacinto: {
      mainImage: Jacinto1,
      images: [Jacinto1, Jacinto1, Jacinto1, Jacinto1],
      age: '7 años',
      breed: 'Andaluz cruzado',
      gender: 'Macho',
      color: 'Ruano',
      height: '1.60 m',
      description: [
        'Jacinto es un caballo enérgico pero noble. Necesita un hogar con espacio suficiente para correr y ejercitarse regularmente.',
        'Es ideal para jinetes con experiencia que busquen un compañero con carácter y resistencia para paseos largos.'
      ]
    },
    Magnum: {
      mainImage: Magnum1,
      images: [Magnum1, Magnum1, Magnum1, Magnum1],
      age: '6 meses',
      breed: 'Cruzado',
      gender: 'Macho',
      color: 'Tostado',
      height: '1.20 m (en desarrollo)',
      description: [
        'Magnum es un potro que fue rescatado de una situación de desnutrición. Ahora está recuperado y tiene un gran potencial.',
        'Necesita un hogar con experiencia en potros jóvenes donde pueda crecer sano y fuerte con la atención adecuada.'
      ]
    },
    Salomé: {
      mainImage: Salome1,
      images: [Salome1, Salome1, Salome1, Salome1],
      age: '4 años',
      breed: 'Criolla',
      gender: 'Hembra',
      color: 'Zaino',
      height: '1.48 m',
      description: [
        'Salomé fue rescatada de una situación de maltrato, pero gracias a nuestros cuidados ahora está completamente recuperada.',
        'Busca un hogar amoroso donde pueda sentirse segura. Es ideal para paseos tranquilos y ha demostrado ser muy cariñosa con sus cuidadores.'
      ]
    },
    Torio: {
      mainImage: Torio1,
      images: [Torio1, Torio1, Torio1, Torio1],
      age: '10 años',
      breed: 'Criollo',
      gender: 'Macho castrado',
      color: 'Negro',
      height: '1.58 m',
      description: [
        'Torio es un caballo adulto con experiencia en equitación. Tiene un temperamento tranquilo y es muy confiable bajo la silla.',
        'Busca un compañero que pueda apreciar su experiencia y darle los cuidados que merece en esta etapa de su vida.'
      ]
    },
    Zeus: {
      mainImage: Zeus1,
      images: [Zeus1, Zeus1, Zeus1, Zeus1],
      age: '3 meses',
      breed: 'Pura Raza Española cruzado',
      gender: 'Macho',
      color: 'Gris',
      height: '1.10 m (en desarrollo)',
      description: [
        'Zeus es un potrillo muy joven que está aprendiendo a confiar tras ser rescatado de una situación de abandono.',
        'A pesar de su difícil comienzo, muestra un carácter tranquilo y orgulloso. Necesita un hogar con experiencia en potros donde pueda crecer seguro.'
      ]
    }
  };
  
  // Actualizar los datos del caballo cuando cambia el nombre
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
  
  // Función para cerrar con animación
  const closeWithAnimation = () => {
    setIsClosing(true);
    // Esperar a que termine la animación antes de cerrar realmente
    setTimeout(() => {
      onClose();
    }, 500); // Duración de la animación
  };
  
  const handleAdoptionRequest = () => {
    showMessage(`¡Gracias por tu interés en ${horseName}! Completa los datos de contacto.`, 'success');
    
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
        title: `${horseName} busca hogar`,
        text: `Conoce a ${horseName}, un hermoso caballo en adopción.`,
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
          <h2>Adopta a {horseData.name}</h2>
          <p>{horseData.name} busca un hogar definitivo donde pueda recibir el amor y cuidado que merece. Conoce su historia y ayúdanos a encontrarle una familia.</p>
          <button className="close-adoption" onClick={closeWithAnimation} aria-label="Cerrar">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="horse-grid">
          {/* Cuadrante superior izquierdo: Galería de imágenes */}
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
          
          {/* Cuadrante superior derecho: Información del caballo */}
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