import { useEffect, useRef } from 'react';
import '../styles/service-detail.css';

import veterinaryImg from '../assets/imagenes/veterinary.webp';
import shelterImg from '../assets/imagenes/shelter.webp';
import nutritionImg from '../assets/imagenes/nutrition.webp';
import adoptionImg from '../assets/imagenes/adoption.webp';
import therapyImg from '../assets/imagenes/therapy.webp';
import educationImg from '../assets/imagenes/education.webp';

const serviceImages = {
  veterinary: veterinaryImg,
  shelter: shelterImg,
  nutrition: nutritionImg,
  adoption: adoptionImg,
  therapy: therapyImg,
  education: educationImg
};

const ServiceDetail = ({ isOpen, onClose, service }) => {
  const detailRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const getServiceImage = () => {
    return serviceImages[service.id] || veterinaryImg;
  };

  return (
    <div className="service-detail-overlay">
      <div className="service-detail-container" ref={detailRef}>
        <div className="service-detail-header">
          <h2>{service.title}</h2>
          <button className="close-detail-btn" onClick={onClose}>×</button>
        </div>

        <div className="service-detail-content">
          <div className="service-detail-gallery">
            <div className="service-main-image">
              <img 
                src={getServiceImage()} 
                alt={service.title} 
              />
            </div>
          </div>

          <div className="service-detail-info">
            <div className="service-detail-description">
              <h3>Gracias a tu ayuda esto es posible</h3>
              <p className="service-icon-large">{service.icon}</p>
              <p>{service.description}</p>

              {service.id === 'veterinary' && (
                <>
                  <p>Nuestro equipo veterinario especializado proporciona atención médica integral para todos los caballos rescatados, incluyendo:</p>
                  <ul>
                    <li>Exámenes de salud completos</li>
                    <li>Tratamiento de lesiones y enfermedades</li>
                    <li>Cuidado dental equino</li>
                    <li>Programas de vacunación y desparasitación</li>
                    <li>Cirugías y procedimientos especializados</li>
                  </ul>
                </>
              )}

              {service.id === 'shelter' && (
                <>
                  <p>Nuestro refugio ofrece un entorno seguro y tranquilo donde los caballos pueden recuperarse y prosperar:</p>
                  <ul>
                    <li>Establos cómodos y limpios</li>
                    <li>Amplios corrales para ejercicio diario</li>
                    <li>Áreas de pastoreo natural</li>
                    <li>Zonas de descanso protegidas</li>
                    <li>Supervisión las 24 horas por personal capacitado</li>
                  </ul>
                </>
              )}

              {service.id === 'nutrition' && (
                <>
                  <p>Desarrollamos planes de alimentación personalizados para cada caballo según sus necesidades específicas:</p>
                  <ul>
                    <li>Evaluación nutricional individual</li>
                    <li>Dietas equilibradas con heno de alta calidad</li>
                    <li>Suplementos nutricionales específicos</li>
                    <li>Horarios de alimentación estructurados</li>
                    <li>Monitoreo continuo del peso y la condición física</li>
                  </ul>
                </>
              )}

              {service.id === 'adoption' && (
                <>
                  <p>Nuestro programa de adopción responsable conecta caballos rehabilitados con hogares amorosos:</p>
                  <ul>
                    <li>Proceso de solicitud y evaluación cuidadoso</li>
                    <li>Período de adaptación supervisado</li>
                    <li>Visitas de seguimiento regulares</li>
                    <li>Asesoramiento continuo para los adoptantes</li>
                    <li>Red de apoyo para nuevos propietarios</li>
                  </ul>
                </>
              )}

              {service.id === 'therapy' && (
                <>
                  <p>Nuestros programas de rehabilitación conductual ayudan a caballos traumatizados a recuperar su confianza:</p>
                  <ul>
                    <li>Técnicas de desensibilización gradual</li>
                    <li>Entrenamiento positivo y sin estrés</li>
                    <li>Terapia individualizada según el trauma específico</li>
                    <li>Integración social gradual con otros caballos</li>
                    <li>Evaluación continua del progreso emocional</li>
                  </ul>
                </>
              )}

              {service.id === 'education' && (
                <>
                  <p>Nuestros programas educativos promueven la conciencia sobre el bienestar equino:</p>
                  <ul>
                    <li>Talleres para escuelas y comunidades</li>
                    <li>Seminarios sobre cuidado responsable de caballos</li>
                    <li>Visitas guiadas a nuestras instalaciones</li>
                    <li>Materiales educativos gratuitos</li>
                    <li>Capacitación para dueños y cuidadores</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
