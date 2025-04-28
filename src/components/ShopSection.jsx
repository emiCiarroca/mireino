import { useState } from 'react';
import '../styles/shop.css';
import Cart from './Cart'; 
import ProductDetail from './ProductDetail'; 

// Importar imágenes desde la carpeta /src/assets/imagenes
import alfajores from '/src/assets/imagenes/alfajores.webp';
import apoyavasos from '/src/assets/imagenes/apoyavasos.webp';
import blockdenotas from '/src/assets/imagenes/blockdenotas.webp';
import bolsa from '/src/assets/imagenes/bolsa.webp';
import botelladeagua from '/src/assets/imagenes/botelladeagua.webp';
import botellajaobn from '/src/assets/imagenes/botellajabon.webp';
import buzo from '/src/assets/imagenes/buzo.webp';
import calendario from '/src/assets/imagenes/calendario.webp';
import camiseta from '/src/assets/imagenes/camiseta.webp';
import cuadernillo from '/src/assets/imagenes/cuadernillo.webp';
import empanadas from '/src/assets/imagenes/empanadas.webp';
import gorra from '/src/assets/imagenes/gorra.webp';
import llavero from '/src/assets/imagenes/llavero.webp';
import musculosa from '/src/assets/imagenes/musculosa.webp';
import pulsera from '/src/assets/imagenes/pulsera.webp';
import sticker from '/src/assets/imagenes/sticker.webp';
import taza from '/src/assets/imagenes/taza.webp';
import vasoplastico from '/src/assets/imagenes/vasoplastico.webp';
import vasotermico from '/src/assets/imagenes/vasotermico.webp';
import vela from '/src/assets/imagenes/vela.webp';

const ShopSection = ({ showMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const categories = [
    { id: 'all', name: 'Todos los productos' },
    { id: 'clothing', name: 'Ropa' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'supplies', name: 'Comestibles' },
    { id: 'books', name: 'Libros' }
  ];
  
  const products = [
    {
      id: 1,
      name: "Camiseta Solidaria",
      price: 1500.00,
      category: "clothing",
      description: "Camiseta 100% algodón orgánico con el logo de nuestra ONG.",
      image: camiseta
    },
    {
      id: 2,
      name: "Buzo Mi Reino Por Un Caballo",
      price: 39000.00,
      category: "clothing",
      description: "Buzo cálido y cómodo para los amantes de los caballos.",
      image: buzo
    },
    {
      id: 3,
      name: "Gorra con Diseño ONG",
      price: 2800.00,
      category: "clothing",
      description: "Gorra con visera para protegerte del sol durante las actividades al aire libre.",
      image: gorra
    },
    {
      id: 4,
      name: "Pulsera Solidaria",
      price: 500.00,
      category: "accessories",
      description: "Pulsera artesanal hecha por nuestros voluntarios.",
      image: pulsera
    },
    {
      id: 5,
      name: "Llavero Caballo",
      price: 800.00,
      category: "accessories",
      description: "Llavero con forma de caballo, cada compra ayuda a nuestros rescates.",
      image: llavero
    },
    {
      id: 6,
      name: "Botella de Agua Reutilizable",
      price: 2500.00,
      category: "accessories",
      description: "Botella ecológica con diseño de caballos salvajes.",
      image: botelladeagua
    },
    {
      id: 7,
      name: "Vaso térmico con logo ONG",
      price: 2900.00,
      category: "accessories",
      description: "Vaso de plástico térmico con logo de nuestra ONG.",
      image: vasotermico
    },
    {
      id: 8,
      name: "Calcomanía de caballos",
      price: 600.00,
      category: "accessories",
      description: "Calcomanias varias de caballos o logo ONG",
      image: sticker
    },
    {
      id: 9,
      name: "Jabón Liquido de tocador",
      price: 1500.00,
      category: "accessories",
      description: "Botella x250cc aromas varios",
      image: botellajaobn
    },
    {
      id: 10,
      name: "Bolsa reutilizable con nuestro logo",
      price: 500.00,
      category: "accessories",
      description: "Bolsa reutilizable, reforzada con diseño de nuestra ONG",
      image: bolsa
    },
    {
      id: 11,
      name: "Cuadernillo Hojas rayadas'",
      price: 2900.00,
      category: "books",
      description: "Cuadernillo con imágenes de caballos",
      image: cuadernillo
    },
    {
      id: 12,
      name: "Docena de Empanadas Veganas",
      price: 12400.00,
      category: "supplies",
      description: "12 Empanadas de verduras",
      image: empanadas
    },
    {
      id: 13,
      name: "Calendario 2025",
      price: 1900.00,
      category: "accessories",
      description: "Calendario con fotografías de nuestros caballos rescatados.",
      image: calendario
    },
    {
      id: 14,
      name: "Taza Cerámica",
      price: 5400.00,
      category: "accessories",
      description: "Taza de cerámica con diseño exclusivo de nuestra ONG.",
      image: taza
    },
    {
      id: 15,
      name: "Cuaderno de Notas",
      price: 2900.00,
      category: "books",
      description: "Block de Hojas lisas para dibujo",
      image: blockdenotas
    },
    {
      id: 16,
      name: "Docena de Alfajores de Maicena'",
      price: 3400.00,
      category: "supplies",
      description: "12 Riquisimos alfajores de maicena con dulce de leche",
      image: alfajores
    },
    {
      id: 17,
      name: "Musculosa Mi reino",
      price: 9000.00,
      category: "clothing",
      description: "Remera de algodón con el logo de nuestra organización.",
      image: musculosa
    },
    {
      id: 18,
      name: "Vela aromática",
      price: 1700.00,
      category: "accessories",
      description: "Vela artesanal con esencias variás",
      image: vela
    },
    {
      id: 19,
      name: "Vaso de plastico con diseño",
      price: 1100.00,
      category: "accessories",
      description: "Vaso de 500cc boca hancha con diseños",
      image: vasoplastico
    },
    {
      id: 20,
      name: "Apoya Vasos con logo de la ONG",
      price: 200.00,
      category: "accessories",
      description: "Circular, varios diseños",
      image: apoyavasos
    }
  ];
  
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