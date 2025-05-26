import { useState, useCallback, memo, useEffect } from 'react';
import '../styles/shop.css';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import { categories } from '../data/categories';
import { useCart } from '../hooks/useCart';

const ProductCard = memo(({ product, onAddToCart, onViewDetail }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleCardClick = (e) => {
    // Evitar que el click en el card active cuando se hace click en el botón
    if (e.target.closest('.add-to-cart-btn')) {
      return;
    }
    onViewDetail(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCartClick}
            type="button"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
});

const ShopSection = ({ showMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/data/products.json');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Formato de datos inválido: se esperaba un array');
        }
        
        // Validar estructura de cada producto
        const validatedProducts = data.map(product => ({
          id: product.id || 0,
          name: product.name || 'Producto sin nombre',
          price: parseFloat(product.price) || 0,
          category: product.category || 'other',
          description: product.description || 'Sin descripción',
          image: product.image || '/src/assets/imagenes/logo2.webp',
          stock: parseInt(product.stock) || 0
        }));
        
        setProducts(validatedProducts);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(err.message);
        showMessage(`Error al cargar productos: ${err.message}`, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [showMessage]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  const handleAddToCart = useCallback((product) => {
    if (product.stock > 0) {
      const message = addToCart(product);
      showMessage(message, 'success');
    } else {
      showMessage('Este producto está agotado', 'error');
    }
  }, [addToCart, showMessage]);
  
  const handleRemoveFromCart = useCallback((index) => {
    removeFromCart(index);
    showMessage('Producto removido del carrito', 'info');
  }, [removeFromCart, showMessage]);
  
  const handleClearCart = useCallback(() => {
    clearCart();
    showMessage('Carrito vaciado', 'info');
  }, [clearCart, showMessage]);
  
  const handleUpdateQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const productInCart = cart[index];
    const productInStock = products.find(p => p.id === productInCart.id);
    
    if (productInStock && newQuantity > productInStock.stock) {
      showMessage(`No hay suficiente stock. Máximo disponible: ${productInStock.stock}`, 'error');
      return;
    }
    
    updateQuantity(index, newQuantity);
  }, [cart, products, updateQuantity, showMessage]);

  const openProductDetail = useCallback((product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  }, []);
  
  const closeProductDetail = useCallback(() => {
    setIsProductDetailOpen(false);
  }, []);

  const viewCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCategoryClick = useCallback((e, categoryId) => {
    e.preventDefault();
    setSelectedCategory(categoryId);
  }, []);

  const handleCartClick = useCallback((e) => {
    e.preventDefault();
    viewCart();
  }, [viewCart]);

  const handleRetryClick = useCallback((e) => {
    e.preventDefault();
    window.location.reload();
  }, []);

  if (isLoading) {
    return (
      <section id="shop" className="shop">
        <div className="container">
          <div className="loading-message">
            <p>Cargando productos...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="shop">
        <div className="container">
          <div className="error-message">
            <p>Error al cargar los productos: {error}</p>
            <button 
              onClick={handleRetryClick}
              className="btn retry-btn"
              type="button"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

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
                onClick={(e) => handleCategoryClick(e, category.id)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <button 
            className="cart-btn" 
            onClick={handleCartClick}
            type="button"
          >
            Ver Carrito ({cartCount})
          </button>
        </div>
        
        <div className="shop-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-wrapper">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetail={openProductDetail}
                />
              </div>
            ))
          ) : (
            <div className="no-products-message">
              {products.length === 0 
                ? 'No se encontraron productos disponibles' 
                : 'No hay productos en esta categoría'}
            </div>
          )}
        </div>
      </div>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={closeCart}
        cartItems={cart} 
        removeItem={handleRemoveFromCart}
        clearCart={handleClearCart}
        updateQuantity={handleUpdateQuantity}
        total={cartTotal}
      />

      <ProductDetail
        isOpen={isProductDetailOpen}
        onClose={closeProductDetail}
        product={selectedProduct}
        addToCart={handleAddToCart}
      />
    </section>
  );
};

export default ShopSection;