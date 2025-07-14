import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import '../styles/shop.css';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import { categories } from '../data/categories';
import { useCart } from '../hooks/useCart';
import Checkout from './Checkout';

const ProductCard = memo(({ product, onAddToCart, onViewDetail }) => {
  const handleAddToCartClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  }, [product, onAddToCart]);

  const handleCardClick = useCallback((e) => {
    e.preventDefault();
    if (e.target.closest('.add-to-cart-btn')) {
      return;
    }
    onViewDetail(product);
  }, [product, onViewDetail]);

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
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Añadir' : 'Agotado'}
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
  } = useCart();

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

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, selectedCategory, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    setShowCheckout(true);
  }, []);

  const handleCompletePurchase = useCallback(() => {
    showMessage('¡Compra realizada con éxito! Gracias por tu apoyo.', 'success');
    clearCart();
    setShowCheckout(false);
  }, [clearCart, showMessage]);

  const handleBackToCart = useCallback(() => {
    setShowCheckout(false);
    setIsCartOpen(true);
  }, []);

  const handleCategoryClick = useCallback((e, categoryId) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCartClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    viewCart();
  }, [viewCart]);

  const handleRetryClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos por nombre, descripción o categoría..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Buscar productos"
            />
          </div>
          
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
            <span>🛒</span> Carrito ({cartCount})
          </button>
        </div>
        
        <div className="shop-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
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
                : 'No hay productos que coincidan con tu búsqueda'}
            </div>
          )}
        </div>

        {filteredProducts.length > productsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              type="button"
              aria-label="Página anterior"
            >
              &laquo; Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
                type="button"
                aria-label={`Ir a página ${page}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              type="button"
              aria-label="Página siguiente"
            >
              Siguiente &raquo;
            </button>
          </div>
        )}
      </div>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={closeCart}
        cartItems={cart} 
        removeItem={handleRemoveFromCart}
        clearCart={handleClearCart}
        updateQuantity={handleUpdateQuantity}
        total={cartTotal}
        onCheckout={handleCheckout}
      />

      {showCheckout && (
      <Checkout
        cartItems={cart}
        total={cartTotal}
        onBackToCart={handleBackToCart}
        onCompletePurchase={handleCompletePurchase}
      />
    )}

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