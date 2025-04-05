import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ShopSection from './components/ShopSection'
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

function App() {
  const [message, setMessage] = useState({ text: '', type: '', visible: false });

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type, visible: true });
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMessage(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <>
      <Header />
      <Hero showMessage={showMessage} />
      <ProjectSection showMessage={showMessage} />
      <AboutSection showMessage={showMessage} />
      <ServicesSection />
      <ShopSection showMessage={showMessage} />
      <ContactSection showMessage={showMessage} />
      <Footer showMessage={showMessage} />
      {message.visible && <Message text={message.text} type={message.type} />}
    </>
  )
}

export default App
