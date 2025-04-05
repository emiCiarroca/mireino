import { useState } from 'react'
import '../styles/contact.css'

const ContactSection = ({ showMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.email) {
      showMessage(`Gracias por tu mensaje, ${formData.name}. Te contactaremos pronto.`, 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      showMessage('Por favor completa todos los campos requeridos.', 'error');
    }
  };

  return (
    <section id="contact" className="contact container">
      <div className="section-header">
        <h2>Contacto</h2>
        <p>¿Listo para ayudar?</p>
      </div>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nombre" 
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="text" 
            placeholder="Asunto" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea 
            placeholder="Tu mensaje" 
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Enviar Mensaje</button>
        </form>
        <div className="contact-info">
          <h3>Información de contacto</h3>
          <p>Email: contacto@mireinoporuncaballo.org</p>
          <p>Teléfono: +54 9 343 4435678</p>
          <p>Dirección: Ruta 123, Km. 45, Entre Ríos, Argentina</p>
          <p>Estamos disponibles de lunes a viernes, de 9am a 5pm.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
