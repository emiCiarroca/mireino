import { useState } from 'react';
import '../styles/shop.css';
import Cart from './Cart'; 
import ProductDetail from './ProductDetail'; 
import { categories, products } from '../data/products';

const ShopSection = ({ showMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
    showMessage(`${product.name} añadido al carrito`, 'success');
  };
  
  const viewCart = () => {
    setIsCartOpen(true);
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  const removeFromCart = (index) => {
    const newCart = [...cart];
    const removedItem = newCart[index];
    newCart.splice(index, 1);
    setCart(newCart);
    showMessage(`${removedItem.name} eliminado del carrito`, 'info');
  };
  
  const clearCart = () => {
    setCart([]);
    showMessage('Carrito vaciado', 'info');
  };
  
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };
  
  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
  };
  
  return (
    <section id="shop" className="shop">
      <div className="container">
        <div className="section-header">
          <h2>Nuestra Tienda Solidaria</h2>
          <p>
            Cada compra contribuye directamente a nuestros programas de rescate y rehabilitación 
            de caballos. ¡Compra con propósito!
          </p>
        </div>
        
        <div className="shop-controls">
          <div className="shop-categories">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <button className="cart-btn" onClick={viewCart}>
            Ver Carrito ({cart.length})
          </button>
        </div>
        
        <div className="shop-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => openProductDetail(product)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-bottom">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se abra el detalle al hacer clic en el botón
                      addToCart(product);
                    }}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="shop-cta">
          <p>
            El 100% de nuestras ganancias se destina al cuidado de caballos rescatados. 
            Tu compra marca la diferencia.
          </p>
          <a href="#contact" className="btn">
            ¿Preguntas sobre productos? Contáctanos
          </a>
        </div>
      </div>
      
      {/* Componente de Carrito */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        cartItems={cart} 
        removeItem={removeFromCart}
        clearCart={clearCart}
      />

      {/* Componente de Detalle del Producto */}
      <ProductDetail
        isOpen={isProductDetailOpen}
        onClose={closeProductDetail}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </section>
  );
};

export default ShopSection;