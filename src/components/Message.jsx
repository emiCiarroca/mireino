import { useEffect, useState } from 'react'

const Message = ({ text, type }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), 10);
    
    return () => setOpacity(0);
  }, []);

  const messageStyles = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '15px 25px',
    borderRadius: '4px',
    zIndex: '1000',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    opacity: opacity,
    maxWidth: '80%',
    backgroundColor: 
      type === 'success' ? '#4CAF50' : 
      type === 'error' ? '#F44336' : 
      type === 'info' ? '#2196F3' : '#333',
    color: 'white'
  };

  return (
    <div style={messageStyles}>
      {text}
    </div>
  );
};

export default Message;