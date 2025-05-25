import { useEffect, useRef } from 'react';
import '../styles/product-detail.css';

const ProductDetail = ({ isOpen, onClose, product, addToCart }) => {
  const detailRef = useRef(null);
  
  // Generar imágenes de ejemplo basadas en la imagen principal
  const productImages = product ? [
    product.image,
    product.image, 
    product.image,
    product.image,
    product.image
  ] : [];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container" ref={detailRef}>
        <div className="product-detail-header">
          <h2>{product.name}</h2>
          <button 
            className="close-detail-btn" 
            onClick={onClose}
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/src/assets/imagenes/isotiporeino.webp';
                }}
              />
            </div>
            <div className="product-thumbnails">
              {productImages.map((img, index) => (
                <div key={index} className="product-thumbnail">
                  <img 
                    src={img} 
                    alt={`${product.name} vista ${index + 1}`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/src/assets/imagenes/isotiporeino.webp';
                    }}
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
                onClick={(e) => {
                  e.preventDefault();
                  if (product.stock > 0) {
                    addToCart(product);
                    onClose();
                  } else {
                    alert('Este producto está agotado');
                  }
                }}
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