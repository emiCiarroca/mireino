import { useEffect, useRef } from 'react';
import '../styles/checkout.css';

const Checkout = ({ 
  cartItems,
  total,
  onBackToCart,
  onCompletePurchase
}) => {
  const checkoutRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onBackToCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onBackToCart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompletePurchase();
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-container" ref={checkoutRef}>
        <div className="checkout-header">
          <h2>Finalizar Compra</h2>
          <button 
            className="close-checkout-btn" 
            onClick={onBackToCart}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="checkout-content">
          <div className="checkout-summary">
            <h3>Resumen de tu compra</h3>
            <div className="summary-items">
              {cartItems.map((item, index) => (
                <div key={`checkout-${item.id}-${index}`} className="summary-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Información de pago</h3>
            
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input 
                type="text" 
                id="name" 
                required 
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input 
                type="email" 
                id="email" 
                required 
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección de envío</label>
              <input 
                type="text" 
                id="address" 
                required 
                placeholder="Calle, número, ciudad"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="card">Número de tarjeta</label>
                <input 
                  type="text" 
                  id="card" 
                  required 
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="form-group small">
                <label htmlFor="expiry">Expira</label>
                <input 
                  type="text" 
                  id="expiry" 
                  required 
                  placeholder="MM/AA"
                />
              </div>
              <div className="form-group small">
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  required 
                  placeholder="123"
                />
              </div>
            </div>

            <div className="form-group checkbox">
              <input 
                type="checkbox" 
                id="donation" 
                defaultChecked 
              />
              <label htmlFor="donation">
                Añadir donación del 5% para rescate de caballos
              </label>
            </div>

            <div className="checkout-actions">
              <button 
                type="button" 
                className="btn back-btn"
                onClick={onBackToCart}
              >
                Volver al carrito
              </button>
              <button 
                type="submit" 
                className="btn confirm-btn"
              >
                Confirmar Compra
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;