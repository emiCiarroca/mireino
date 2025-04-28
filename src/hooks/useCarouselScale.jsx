import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para implementar un carousel con efecto de escala
 * @returns {Object} Objeto con propiedades y métodos para gestionar el carousel
 */
const useCarouselScale = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);

  // Registrar una tarjeta en el carousel
  const registerCard = (element) => {
    if (element && !cardsRef.current.includes(element)) {
      cardsRef.current.push(element);
    }
  };

  // Calcular el índice activo basado en la posición del scroll
  const calculateActiveIndex = useCallback(() => {
    if (!carouselRef.current || cardsRef.current.length === 0) return;

    const carousel = carouselRef.current;
    const scrollPosition = carousel.scrollLeft;
    const containerWidth = carousel.offsetWidth;
    const centerPoint = scrollPosition + containerWidth / 2;

    // Encontrar la tarjeta más cercana al centro
    let closestIndex = 0;
    let closestDistance = Infinity;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const cardLeft = card.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const distance = Math.abs(centerPoint - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  // Actualizar el índice activo cuando el carousel se desplaza
  const handleScroll = useCallback(() => {
    if (sliding) return;

    const newIndex = calculateActiveIndex();
    if (newIndex !== undefined && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, calculateActiveIndex, sliding]);

  // Ir a una tarjeta específica
  const goToCard = useCallback((index) => {
    if (!carouselRef.current || !cardsRef.current[index]) return;

    setSliding(true);
    const carousel = carouselRef.current;
    const card = cardsRef.current[index];
    const containerWidth = carousel.offsetWidth;

    // Calcular la posición de desplazamiento para centrar la tarjeta
    const scrollPosition = card.offsetLeft - (containerWidth / 2) + (card.offsetWidth / 2);

    carousel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    setActiveIndex(index);

    // Restablecer el estado sliding después de la animación
    setTimeout(() => {
      setSliding(false);
    }, 300);
  }, []);

  // Ir a la siguiente tarjeta
  const next = useCallback(() => {
    const nextIndex = Math.min(activeIndex + 1, cardsRef.current.length - 1);
    goToCard(nextIndex);
  }, [activeIndex, goToCard]);

  // Ir a la tarjeta anterior
  const prev = useCallback(() => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    goToCard(prevIndex);
  }, [activeIndex, goToCard]);

  // Actualizar el índice activo cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const newIndex = calculateActiveIndex();
      if (newIndex !== undefined) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateActiveIndex]);

  // Configurar los eventos del carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', handleScroll);
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    carouselRef,
    registerCard,
    activeIndex,
    next,
    prev,
    goToCard
  };
};

export default useCarouselScale;
