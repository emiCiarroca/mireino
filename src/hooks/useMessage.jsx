import { useState } from 'react';

/**
 * Hook personalizado para gestionar mensajes de notificación
 * @returns {Object} Objeto con el estado del mensaje y funciones para gestionarlo
 */
const useMessage = () => {
  // Estado para almacenar información del mensaje
  const [message, setMessage] = useState({
    text: '',        // Texto del mensaje
    type: 'info',    // Tipo de mensaje (info, success, error)
    visible: false   // Visibilidad del mensaje
  });

  /**
   * Muestra un mensaje de notificación
   * @param {string} text - Texto del mensaje
   * @param {string} type - Tipo de mensaje (info, success, error)
   * @param {number} duration - Duración en ms antes de que desaparezca (por defecto 3000ms)
   */
  const showMessage = (text, type = 'info', duration = 3000) => {
    // Actualiza el estado para mostrar el mensaje
    setMessage({ text, type, visible: true });
    
    // Configura un temporizador para ocultar el mensaje después del tiempo especificado
    setTimeout(() => {
      setMessage(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  /**
   * Oculta el mensaje manualmente
   */
  const hideMessage = () => {
    setMessage(prev => ({ ...prev, visible: false }));
  };

  // Retorna el estado y las funciones para manipularlo
  return {
    message,
    showMessage,
    hideMessage
  };
};

export default useMessage;
