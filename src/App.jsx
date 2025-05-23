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

import './styles/index.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/projects.css'
import './styles/carousel-scale.css'
import './styles/services.css'
import './styles/shop.css'
import './styles/cart.css'
import './styles/product-detail.css'
import './styles/service-detail.css'
import './styles/adoption.css'

function App() {
  const [message, setMessage] = useState({ text: '', type: '', visible: false });
  const [showAdoption, setShowAdoption] = useState(false);
  const [currentHorse, setCurrentHorse] = useState('');

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type, visible: true });
    
    setTimeout(() => {
      setMessage(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleShowAdoption = (horseName = 'Benito') => {
    setCurrentHorse(horseName);
    setShowAdoption(true);
    setTimeout(() => {
      const adoptionSection = document.getElementById('adoption');
      if (adoptionSection) {
        adoptionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseAdoption = () => {
    setShowAdoption(false);
    setCurrentHorse('');
  };

  return (
    <>
      <Header />
      <Hero showMessage={showMessage} />
      <ProjectSection showMessage={showMessage} onShowAdoption={handleShowAdoption} />
      <AboutSection showMessage={showMessage} />
      <ServicesSection />
      {showAdoption && (
        <AdoptionSection 
          showMessage={showMessage} 
          onClose={handleCloseAdoption} 
          horseName={currentHorse}
        />
      )}
      <ShopSection showMessage={showMessage} />
      <ContactSection showMessage={showMessage} />
      <Footer showMessage={showMessage} />
      {message.visible && <Message text={message.text} type={message.type} />}
    </>
  )
}

export default App