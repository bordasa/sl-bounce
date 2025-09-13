import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',
      backgroundColor: 'transparent',
      pointerEvents: 'none'
    }}>
      <button
        onClick={handleLogoClick}
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(1.5rem, 8vw, 3rem)',
          color: '#000000',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          pointerEvents: 'auto',
          padding: '8px 16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        SCULPTURELANDIA
      </button>
    </header>
  );
};

export default Header;