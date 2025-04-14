import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ShopSection from './components/ShopSection'
import AdoptionSection from './components/AdoptionSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Message from './components/Message'

// Importar todos los estilos
import './styles/index.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/projects.css'
import './styles/services.css'
import './styles/shop.css'
import './styles/cart.css'
import './styles/adoption.css'

function App() {
  const [message, setMessage] = useState({ text: '', type: '', visible: false });
  const [showAdoption, setShowAdoption] = useState(false);

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type, visible: true });
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMessage(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Función para mostrar la sección de adopción
  const handleShowAdoption = () => {
    setShowAdoption(true);
    // Esperar un momento para que la sección se renderice antes de desplazarse
    setTimeout(() => {
      const adoptionSection = document.getElementById('adoption');
      if (adoptionSection) {
        adoptionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Función para cerrar la sección de adopción
  const handleCloseAdoption = () => {
    setShowAdoption(false);
  };

  return (
    <>
      <Header />
      <Hero showMessage={showMessage} />
      <ProjectSection showMessage={showMessage} onShowAdoption={handleShowAdoption} />
      <AboutSection showMessage={showMessage} />
      <ServicesSection />
      {showAdoption && <AdoptionSection showMessage={showMessage} onClose={handleCloseAdoption} />}
      <ShopSection showMessage={showMessage} />
      <ContactSection showMessage={showMessage} />
      <Footer showMessage={showMessage} />
      {message.visible && <Message text={message.text} type={message.type} />}
    </>
  )
}

export default App
