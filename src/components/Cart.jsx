import { useEffect, useRef } from 'react';
import '../styles/cart.css';

const Cart = ({ isOpen, onClose, cartItems, removeItem, clearCart }) => {
  const cartRef = useRef(null);

  // Calcular el total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Cerrar el carrito al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Añadir event listener solo cuando el carrito está abierto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Si el carrito no está abierto, no renderiza
  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container" ref={cartRef}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-cart-btn" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>Tu carrito está vacío</p>
            <button className="btn" onClick={onClose}>Continuar Comprando</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeItem(index)}
                    aria-label="Eliminar producto"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              
              <div className="cart-actions">
                <button className="btn clear-cart-btn" onClick={clearCart}>
                  Vaciar Carrito
                </button>
                <button className="btn checkout-btn">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;