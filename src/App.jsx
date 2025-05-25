import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ShopSection from './components/ShopSection';
import AdoptionSection from './components/AdoptionSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Message from './components/Message';
import Login from './components/Login';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/index.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/projects.css';
import './styles/carousel-scale.css';
import './styles/services.css';
import './styles/shop.css';
import './styles/cart.css';
import './styles/product-detail.css';
import './styles/service-detail.css';
import './styles/adoption.css';
import './styles/login.css';
import './styles/admin.css';

function Home({ showMessage, handleShowAdoption, showAdoption, currentHorse, handleCloseAdoption }) {
  return (
    <>
      <Hero id="home" showMessage={showMessage} />
      <ProjectSection id="projects" showMessage={showMessage} onShowAdoption={handleShowAdoption} />
      <AboutSection id="about" showMessage={showMessage} />
      <ServicesSection id="services" />
      {showAdoption && (
        <AdoptionSection 
          id="adoption"
          showMessage={showMessage} 
          onClose={handleCloseAdoption} 
          horseName={currentHorse}
        />
      )}
      <ShopSection id="shop" showMessage={showMessage} />
      <ContactSection id="contact" showMessage={showMessage} />
    </>
  );
}

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
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/*" 
          element={
            <Home 
              showMessage={showMessage}
              handleShowAdoption={handleShowAdoption}
              showAdoption={showAdoption}
              currentHorse={currentHorse}
              handleCloseAdoption={handleCloseAdoption}
            />
          } 
        />
      </Routes>
      <Footer showMessage={showMessage} />
      {message.visible && <Message text={message.text} type={message.type} />}
    </Router>
  );
}

export default App;