import { useEffect, useRef, useCallback } from 'react';
import '../styles/product-detail.css';

const ProductDetail = ({ isOpen, onClose, product, addToCart }) => {
  const detailRef = useRef(null);

  const productImages = product ? [
    product.image,
    product.image, 
    product.image,
    product.image,
    product.image
  ] : [];
  
  const handleClose = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleContainerClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product && product.stock > 0) {
      addToCart(product);
      onClose();
    } else {
      alert('Este producto está agotado');
    }
  }, [product, addToCart, onClose]);

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = '/src/assets/imagenes/isotiporeino.webp';
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="product-detail-overlay" onClick={handleOverlayClick}>
      <div className="product-detail-container" ref={detailRef} onClick={handleContainerClick}>
        <div className="product-detail-header">
          <h2>{product.name}</h2>
          <button 
            className="close-detail-btn" 
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-gallery">
            <div className="product-main-image">
              <img 
                src={product.image} 
                alt={product.name} 
                onError={handleImageError}
              />
            </div>
            <div className="product-thumbnails">
              {productImages.map((img, index) => (
                <div key={index} className="product-thumbnail">
                  <img 
                    src={img} 
                    alt={`${product.name} vista ${index + 1}`} 
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-detail-info">
            <div className="product-detail-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
              <p>
                Este producto forma parte de nuestra colección solidaria. Cada compra contribuye 
                directamente a los programas de rescate y rehabilitación de caballos de nuestra ONG.
              </p>
            </div>
            
            <div className="product-detail-purchase">
              <div className="product-detail-price">
                <span className="price-label">Precio:</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="product-detail-stock">
                <span className="stock-label">Stock disponible:</span>
                <span className={`stock-value ${product.stock < 5 ? 'low-stock' : ''}`}>
                  {product.stock} {product.stock === 1 ? 'unidad' : 'unidades'}
                </span>
              </div>
              
              <button 
                className="add-to-cart-detail-btn"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                type="button"
              >
                {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;