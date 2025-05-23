import { useState } from 'react';

const useMessage = () => {
  const [message, setMessage] = useState({
    text: '',
    type: 'info',
    visible: false
  });

  const showMessage = (text, type = 'info', duration = 3000) => {
    setMessage({ text, type, visible: true });
    
    setTimeout(() => {
      setMessage(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  const hideMessage = () => {
    setMessage(prev => ({ ...prev, visible: false }));
  };

  return {
    message,
    showMessage,
    hideMessage
  };
};

export default useMessage;