import { useState, useEffect, useRef } from 'react';
import '../styles/projects.css';

// Importación de imágenes
import Benito from "../assets/imagenes/Benito.webp";
import Emilce from "../assets/imagenes/Emilce.webp";
import Eros from "../assets/imagenes/Eros.webp";
import Eva from "../assets/imagenes/Eva.webp";
import Igor from "../assets/imagenes/Igor.webp";
import Ivana from "../assets/imagenes/Ivana.webp";
import Jacinto from "../assets/imagenes/Jacinto.webp";
import Magnum from "../assets/imagenes/Magnum.webp";
import Salome from "../assets/imagenes/Salome.webp";
import Torio from "../assets/imagenes/Torio.webp";
import Zeus from "../assets/imagenes/Zeus.webp";

const ProjectSection = ({ showMessage }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(100);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleViewProject = (e, projectName) => {
    e.preventDefault();
    showMessage(`Abriendo proyecto: ${projectName}`, 'info');
  };

  const projects = [
    { name: "Benito", title: "Equino Fijo en el predio", description: "Sociable, adora las galletas, totalmente tranquilo", image: Benito },
    { name: "Emilce", title: "Potranca de 2 años", description: "Juguetona y curiosa, aprende rápido y se adapta bien a nuevos entornos.", image: Emilce },
    { name: "Eros", title: "Caballo de gran porte", description: "Dócil y con ganas de aprender, ideal para familias con experiencia en cuidado equino.", image: Eros },
    { name: "Eva", title: "Yegua de 3 años", description: "Elegante y atenta, perfecta para actividades ecuestres recreativas una vez adaptada.", image: Eva },
    { name: "Igor", title: "Potrillo de 1 año", description: "Listo para adopción, muy social, amigable con otros caballos y disfruta del contacto humano.", image: Igor },
    { name: "Ivana", title: "Yegua de 5 años", description: "Excelente con niños, muy gentil y paciente. Perfecta para terapias asistidas con caballos.", image: Ivana },
    { name: "Jacinto", title: "Semental de 7 años", description: "Enérgico y noble, necesita un hogar con espacio para correr y ejercitarse regularmente.", image: Jacinto },
    { name: "Magnum", title: "Potro de 6 meses", description: "Recién recuperado de desnutrición, con gran potencial y espíritu indomable.", image: Magnum },
    { name: "Salomé", title: "Yegua de 4 años", description: "Rescatada de maltrato, ahora recuperada y lista para un hogar amoroso donde pueda sentirse segura.", image: Salome },
    { name: "Torio", title: "Caballo adulto", description: "Con experiencia en equitación, busca un compañero que pueda apreciar su temperamento tranquilo.", image: Torio },
    { name: "Zeus", title: "Potrillo de 3 meses", description: "Tan tranquilo como orgulloso, está aprendiendo a confiar tras ser rescatado de una situación de abandono.", image: Zeus }
  ];

  // Calcular el valor máximo para el slider basado en el contenido
  useEffect(() => {
    if (carouselRef.current) {
      const updateMaxValue = () => {
        const carousel = carouselRef.current;
        const scrollWidth = carousel.scrollWidth;
        const clientWidth = carousel.clientWidth;
        
        if (scrollWidth > clientWidth) {
          setMaxSliderValue(scrollWidth - clientWidth);
        } else {
          setMaxSliderValue(100); // Valor predeterminado
        }
      };
      
      updateMaxValue();
      // Actualizar cuando cambie el tamaño de la ventana
      window.addEventListener('resize', updateMaxValue);
      
      return () => {
        window.removeEventListener('resize', updateMaxValue);
      };
    }
  }, []);

  // Manejar el cambio del slider
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = value;
    }
  };

  // Actualizar el slider cuando se desplaza el carrusel
  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      setSliderValue(currentScroll);
    }
  };

  // Función para manejar el inicio del arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    // Cambiar el cursor durante el arrastre
    document.body.style.cursor = 'grabbing';
  };

  // Función para manejar el movimiento durante el arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador para ajustar la velocidad
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Función para manejar el fin del arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
    // Restaurar el cursor
    document.body.style.cursor = 'default';
  };

  // Scroll con botones
  const scrollToNext = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const cardWidth = carousel.querySelector('.project-card').offsetWidth;
      carousel.scrollBy({
        left: cardWidth + 50, // 50 es el gap entre tarjetas
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const cardWidth = carousel.querySelector('.project-card').offsetWidth;
      carousel.scrollBy({
        left: -(cardWidth + 50), // 50 es el gap entre tarjetas
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="work" className="projects container">
      <div className="section-header">
        <h2>Ellos</h2>
        <p>Conoce los equinos activos en el predio</p>
      </div>
      
      <div className="carousel-container">
        <button 
          className="carousel-control prev" 
          onClick={scrollToPrev}
          aria-label="Anterior"
        >
          &#10094;
        </button>
        
        <div 
          className="project-carousel" 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onScroll={handleCarouselScroll}
        >
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image">
                <img 
                  src={project.image || `/api/placeholder/350/250`}
                  alt={`Imagen de ${project.name}`}
                  className="horse-image"
                  loading="lazy" // Carga diferida para mejorar rendimiento
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `/api/placeholder/350/250`;
                  }}
                />
                <div className="project-name">{project.name}</div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a 
                  href="#" 
                  onClick={(e) => handleViewProject(e, project.title)}
                >
                  Conocerlo
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-control next" 
          onClick={scrollToNext}
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </div>
      
      {/* Barra de desplazamiento horizontal en lugar de puntos */}
      <div className="carousel-slider-container">
        <input 
          type="range"
          min="0"
          max={maxSliderValue}
          value={sliderValue}
          onChange={handleSliderChange}
          className="carousel-slider"
          aria-label="Desplazamiento del carrusel"
        />
      </div>
    </section>
  );
};

export default ProjectSection;
