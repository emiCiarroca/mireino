import { useState, useRef } from 'react';

/**
 * Hook personalizado para implementar el comportamiento de arrastrar para desplazar
 * @param {number} clickThreshold - Tiempo máximo en ms para considerar un evento como clic (por defecto 200ms)
 * @returns {Object} Objeto con propiedades y métodos para gestionar el arrastre
 */
const useDragScroll = (clickThreshold = 200) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const dragRef = useRef(null);

  /**
   * Maneja el inicio del arrastre
   * @param {Event} e - Evento del mouse
   */
  const handleDragStart = (e) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - dragRef.current.offsetLeft);
    setScrollLeft(dragRef.current.scrollLeft);
    setDragStartTime(Date.now());
    
    // Cambiar cursor durante el arrastre
    document.body.style.cursor = 'grabbing';
  };

  /**
   * Maneja el movimiento durante el arrastre
   * @param {Event} e - Evento del mouse
   */
  const handleDragMove = (e) => {
    if (!isDragging || !dragRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador para ajustar la velocidad
    dragRef.current.scrollLeft = scrollLeft - walk;
  };

  /**
   * Maneja el final del arrastre
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  /**
   * Determina si un evento fue un clic o un arrastre
   * @returns {boolean} - true si fue un clic, false si fue un arrastre
   */
  const isClick = () => {
    return Date.now() - dragStartTime < clickThreshold;
  };

  /**
   * Desplaza a la siguiente posición
   * @param {number} offset - Cantidad de píxeles a desplazar (por defecto se calcula automáticamente)
   */
  const scrollNext = (offset) => {
    if (!dragRef.current) return;
    
    const container = dragRef.current;
    let scrollAmount;
    
    if (offset) {
      scrollAmount = offset;
    } else {
      // Si hay elementos hijos, usar el ancho del primer hijo + margen
      const firstChild = container.firstElementChild;
      if (firstChild) {
        const style = window.getComputedStyle(firstChild);
        const marginRight = parseInt(style.marginRight) || 0;
        scrollAmount = firstChild.offsetWidth + marginRight;
      } else {
        // Valor predeterminado si no hay hijos
        scrollAmount = container.offsetWidth * 0.8;
      }
    }
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  /**
   * Desplaza a la posición anterior
   * @param {number} offset - Cantidad de píxeles a desplazar (por defecto se calcula automáticamente)
   */
  const scrollPrev = (offset) => {
    if (!dragRef.current) return;
    
    const container = dragRef.current;
    let scrollAmount;
    
    if (offset) {
      scrollAmount = offset;
    } else {
      // Si hay elementos hijos, usar el ancho del primer hijo + margen
      const firstChild = container.firstElementChild;
      if (firstChild) {
        const style = window.getComputedStyle(firstChild);
        const marginRight = parseInt(style.marginRight) || 0;
        scrollAmount = firstChild.offsetWidth + marginRight;
      } else {
        // Valor predeterminado si no hay hijos
        scrollAmount = container.offsetWidth * 0.8;
      }
    }
    
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  };

  return {
    isDragging,
    dragRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isClick,
    scrollNext,
    scrollPrev
  };
};

export default useDragScroll;