import React from 'react';
import Hero from './Hero';
import ProjectSection from './ProjectSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ShopSection from './ShopSection';
import ContactSection from './ContactSection';
import AdoptionSection from './AdoptionSection';

function Home({ 
  showMessage, 
  handleShowAdoption, 
  showAdoption, 
  currentHorse, 
  handleCloseAdoption,
  cart,
  cartCount,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  cartTotal,
  onCartClick
}) {
  return (
    <>
      <Hero id="home" showMessage={showMessage} />
      <ProjectSection 
        id="projects" 
        showMessage={showMessage} 
        onShowAdoption={handleShowAdoption} 
      />
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
      <ShopSection 
        id="shop" 
        showMessage={showMessage}
        cart={cart}
        cartCount={cartCount}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
        onCartClick={onCartClick}
      />
      <ContactSection id="contact" showMessage={showMessage} />
    </>
  );
}

export default Home;