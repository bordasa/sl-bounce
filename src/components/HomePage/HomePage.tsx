import React from 'react';

const HomePage: React.FC = () => {
  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px 20px'
    }}>
      <div>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#000', 
          marginBottom: '16px' 
        }}>
          SCULPTURELANDIA
        </h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#666', 
          marginBottom: '32px' 
        }}>
          Interactive Art Gallery
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#666' }}>Ball Chair</span>
          </div>
          
          <div style={{
            width: '120px',
            height: '120px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#666' }}>Double Nauty</span>
          </div>
          
          <div style={{
            width: '120px',
            height: '120px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#666' }}>Lemon Chair 2</span>
          </div>
        </div>
        
        <p style={{ fontSize: '1rem', color: '#666', fontStyle: 'italic' }}>
          <strong style={{ color: '#000' }}>Homepage Working!</strong> Ready for Phase 3
        </p>
      </div>
    </main>
  );
};

export default HomePage;