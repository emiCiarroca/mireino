import { useEffect, useRef, memo } from 'react';
import '../styles/cart.css';

const CartItem = memo(({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
        <div className="cart-item-quantity">
          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={handleQuantityChange}
            aria-label="Cantidad"
          />
        </div>
      </div>
      <button 
        className="remove-item-btn" 
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        aria-label="Eliminar producto"
        type="button"
      >
        ×
      </button>
    </div>
  );
});

const Cart = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  removeItem, 
  clearCart, 
  updateQuantity,
  total,
  onCheckout
}) => {
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container" ref={cartRef}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button 
            className="close-cart-btn" 
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>Tu carrito está vacío</p>
            <button 
              className="btn" 
              onClick={onClose}
              type="button"
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <CartItem 
                  key={`${item.id}-${index}`}
                  item={item}
                  onRemove={() => removeItem(index)}
                  onUpdateQuantity={(newQuantity) => updateQuantity(index, newQuantity)}
                />
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="btn clear-cart-btn" 
                  onClick={(e) => {
                    e.preventDefault();
                    clearCart();
                  }}
                  type="button"
                >
                  Vaciar Carrito
                </button>
                <button 
                  className="btn checkout-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    onCheckout();
                  }}
                  type="button"
                >
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