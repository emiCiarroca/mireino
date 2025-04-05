import '../styles/services.css'

const ServicesSection = () => {
  const services = [
    {
      icon: "🏥",
      title: "Atención Veterinaria",
      description: "Brindamos atención médica especializada para cada caballo rescatado, tratando desde heridas superficiales hasta condiciones crónicas."
    },
    {
      icon: "🏠",
      title: "Refugio Seguro",
      description: "Ofrecemos un espacio seguro donde los caballos pueden recuperarse física y emocionalmente, con áreas adecuadas para su desarrollo."
    },
    {
      icon: "🥕",
      title: "Alimentación Especializada",
      description: "Proporcionamos dietas personalizadas según las necesidades nutricionales específicas de cada caballo en recuperación."
    },
    {
      icon: "❤️",
      title: "Programa de Adopción",
      description: "Conectamos caballos rehabilitados con familias responsables que puedan brindarles el amor y cuidado que merecen."
    },
    {
      icon: "🧠",
      title: "Terapia Equina",
      description: "Desarrollamos programas de rehabilitación conductual para caballos con traumas, ayudándoles a recuperar la confianza."
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Educación Comunitaria",
      description: "Realizamos talleres y charlas sobre el bienestar equino y la importancia de su protección en nuestra sociedad."
    }
  ];

  return (
    <section id="services" className="services container">
      <div className="section-header">
        <h2>Nuestros Servicios</h2>
        <p>Conoce cómo ayudamos a transformar vidas equinas</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
