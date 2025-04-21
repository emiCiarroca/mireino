import { useState, useEffect } from 'react';
import '../styles/projects.css';
import useDragScroll from '../hooks/useDragScroll';

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

const ProjectSection = ({ showMessage, onShowAdoption }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(100);
  
  // Usar el hook personalizado para manejar el arrastre
  const {
    isDragging,
    dragRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isClick,
    scrollNext,
    scrollPrev
  } = useDragScroll();

  const handleViewProject = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Solo activar si es un clic y no un arrastre
    if (isClick()) {
      onShowAdoption(project.name);
      showMessage(`Conoce más sobre ${project.name}`, 'info');
    }
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

  // Calcular el valor máximo para el slider
  useEffect(() => {
    if (dragRef.current) {
      const updateMaxValue = () => {
        const carousel = dragRef.current;
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
    
    if (dragRef.current) {
      dragRef.current.scrollLeft = value;
    }
  };

  // Actualizar el slider cuando se desplaza el carrusel
  const handleCarouselScroll = () => {
    if (dragRef.current) {
      const currentScroll = dragRef.current.scrollLeft;
      setSliderValue(currentScroll);
    }
  };

  return (
    <section id="projects" className="projects container">
      <div className="section-header">
        <h2>Ellos</h2>
        <p>Conoce los equinos activos en el predio</p>
      </div>
      
      <div className="carousel-container">
        <button 
          className="carousel-control prev" 
          onClick={() => scrollPrev()}
          aria-label="Anterior"
        >
          &#10094;
        </button>
        
        <div 
          className="project-carousel" 
          ref={dragRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onScroll={handleCarouselScroll}
        >
          {projects.map((project, index) => (
            <div 
              className="project-card" 
              key={index}
              onClick={(e) => handleViewProject(e, project)}
            >
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
                <div className="card-overlay">
                  <span>Ver detalles</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-control next" 
          onClick={() => scrollNext()}
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </div>
      
      {/* Barra de desplazamiento horizontal */}
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