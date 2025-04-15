import { useEffect, useRef } from 'react';
import '../styles/product-detail.css';

const ProductDetail = ({ isOpen, onClose, product, addToCart }) => {
  const detailRef = useRef(null);
  
  // Datos de ejemplo para mostrar múltiples imágenes
  const productImages = [
    product?.image,
    product?.image, 
    product?.image,
    product?.image,
    product?.image
  ];
  
  // Stock simulado para ejemplo
  const stockAvailable = Math.floor(Math.random() * 20) + 1;
  
  // Cerrar el detalle al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Añadir event listener solo cuando el detalle está abierto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Si no está abierto o no hay producto, no renderiza
  if (!isOpen || !product) return null;

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container" ref={detailRef}>
        <div className="product-detail-header">
          <h2>{product.name}</h2>
          <button className="close-detail-btn" onClick={onClose}>×</button>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-gallery">
            <div className="product-main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-thumbnails">
              {productImages.map((img, index) => (
                <div key={index} className="product-thumbnail">
                  <img src={img} alt={`${product.name} vista ${index + 1}`} />
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
              <p>
                Fabricado con materiales de alta calidad, este producto está diseñado para durar y 
                proporcionarte satisfacción mientras apoyas una buena causa.
              </p>
            </div>
            
            <div className="product-detail-purchase">
              <div className="product-detail-price">
                <span className="price-label">Precio:</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="product-detail-stock">
                <span className="stock-label">Stock disponible:</span>
                <span className={`stock-value ${stockAvailable < 5 ? 'low-stock' : ''}`}>
                  {stockAvailable} {stockAvailable === 1 ? 'unidad' : 'unidades'}
                </span>
              </div>
              
              <button 
                className="add-to-cart-detail-btn"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
              >
                Añadir al Carrito
              </button>
              
              <div className="product-detail-category">
                <span className="category-label">Categoría:</span>
                <span className="category-value">
                  {product.category === 'clothing' && 'Ropa'}
                  {product.category === 'accessories' && 'Accesorios'}
                  {product.category === 'supplies' && 'Comestibles'}
                  {product.category === 'books' && 'Libros'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;