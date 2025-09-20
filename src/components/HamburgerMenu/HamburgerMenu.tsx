import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      left: '16px',
      zIndex: 100
    }}>
      <button
        onClick={toggleMenu}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <div style={{ width: '100%', height: '3px', backgroundColor: '#000', marginBottom: '3px' }}></div>
        <div style={{ width: '100%', height: '3px', backgroundColor: '#000', marginBottom: '3px' }}></div>
        <div style={{ width: '100%', height: '3px', backgroundColor: '#000' }}></div>
      </button>

      {isOpen && (
        <nav style={{
          position: 'absolute',
          top: '40px',
          left: '0',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          minWidth: '120px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <button 
                onClick={() => handleMenuItemClick('/')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                HOME
              </button>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <button 
                onClick={() => handleMenuItemClick('/view-all')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                VIEW ALL
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleMenuItemClick('/about')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ABOUT
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;