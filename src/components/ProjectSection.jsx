import { useState, useEffect } from 'react';
import '../styles/projects.css';
import useCarouselScale from '../hooks/useCarouselScale';
import { horses } from '../data/horses'; 

const ProjectSection = ({ showMessage, onShowAdoption }) => {
  const {
    carouselRef,
    registerCard,
    activeIndex,
    next,
    prev,
    goToCard
  } = useCarouselScale();

  const [initialized, setInitialized] = useState(false);

  //  Inicializar el carousel solo después de que todos los elementos estén montados
  useEffect(() => {
    if (!initialized && carouselRef.current?.children.length >= horses.length) {
      setTimeout(() => {
        goToCard(0);
      }, 100);
      setInitialized(true);
    }
  }, [initialized, horses.length, carouselRef, goToCard]);

  const handleViewProject = (project) => {
    onShowAdoption(project.name);
    showMessage(`Conoce más sobre ${project.name}`, 'info');
  };

  return (
    <section id="projects" className="projects container">
      <div className="section-header">
        <h2>Ellos</h2>
        <p>Conoce los equinos activos en el predio</p>
      </div>
      
      <div className="carousel-scale-container">
        <div className="carousel-scale" ref={carouselRef}>
          {horses.map((project, index) => (
            <div
              className={`carousel-card ${activeIndex === index ? 'active' : ''}`}
              key={index}
              ref={registerCard}
              onClick={() => {
                goToCard(index);
                setTimeout(() => handleViewProject(project), 300);
              }}
            >
              <div className="carousel-card-inner">
                <div className="carousel-card-image">
                  <img
                    src={project.image || `/api/placeholder/300/250`}
                    alt={`Imagen de ${project.name}`}
                    className="carousel-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/api/placeholder/300/250`;
                    }}
                  />
                  <div className="carousel-card-name">{project.name}</div>
                </div>
                <div className="carousel-card-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                   <div className="carousel-card-overlay">
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-control-btn"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Anterior"
          >
            &#10094;
          </button>
          <button
            className="carousel-control-btn"
            onClick={next}
            disabled={activeIndex === horses.length - 1}
            aria-label="Siguiente"
          >
            &#10095;
          </button>
        </div>

        <div className="carousel-indicators">
          {horses.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${activeIndex === index ? 'active' : ''}`}
              onClick={() => goToCard(index)}
              aria-label={`Ir a tarjeta ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
