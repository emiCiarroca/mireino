import { useState } from 'react';
import '../styles/services.css';
import ServiceDetail from './ServiceDetail';

const ServicesSection = () => {
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const services = [
    {
      id: 'veterinary',
      icon: "🏥",
      title: "Atención Veterinaria",
      description: "Brindamos atención médica especializada para cada caballo rescatado, tratando desde heridas superficiales hasta condiciones crónicas."
    },
    {
      id: 'shelter',
      icon: "🏠",
      title: "Refugio Seguro",
      description: "Ofrecemos un espacio seguro donde los caballos pueden recuperarse física y emocionalmente, con áreas adecuadas para su desarrollo."
    },
    {
      id: 'nutrition',
      icon: "🥕",
      title: "Alimentación Especializada",
      description: "Proporcionamos dietas personalizadas según las necesidades nutricionales específicas de cada caballo en recuperación."
    },
    {
      id: 'adoption',
      icon: "❤️",
      title: "Programa de Adopción",
      description: "Conectamos caballos rehabilitados con familias responsables que puedan brindarles el amor y cuidado que merecen."
    },
    {
      id: 'therapy',
      icon: "🧠",
      title: "Terapia Equina",
      description: "Desarrollamos programas de rehabilitación conductual para caballos con traumas, ayudándoles a recuperar la confianza."
    },
    {
      id: 'education',
      icon: "👨‍👩‍👧‍👦",
      title: "Educación Comunitaria",
      description: "Realizamos talleres y charlas sobre el bienestar equino y la importancia de su protección en nuestra sociedad."
    }
  ];

  const openServiceDetail = (service) => {
    setSelectedService(service);
    setIsServiceDetailOpen(true);
  };
  
  const closeServiceDetail = () => {
    setIsServiceDetailOpen(false);
  };

  return (
    <section id="services" className="services container">
      <div className="section-header">
        <h2>Nuestros Servicios</h2>
        <p>Conoce cómo ayudamos a transformar vidas equinas</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            className="service-card" 
            key={index}
            onClick={() => openServiceDetail(service)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      
      <ServiceDetail
        isOpen={isServiceDetailOpen}
        onClose={closeServiceDetail}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesSection;