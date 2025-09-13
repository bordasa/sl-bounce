import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

console.log('App.tsx loading...');

// Header Component - SCULPTURELANDIA at top center
const Header: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/';
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
      height: '80px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <button
        onClick={handleClick}
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(1.5rem, 8vw, 3rem)',
          color: '#000000',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        SCULPTURELANDIA
      </button>
    </header>
  );
};

// Hamburger Menu Component - Upper left corner
const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '4px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{ 
          width: '100%', 
          height: '3px', 
          backgroundColor: '#000', 
          marginBottom: '3px',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)'
        }}></div>
        <div style={{ 
          width: '100%', 
          height: '3px', 
          backgroundColor: '#000', 
          marginBottom: '3px',
          transition: 'all 0.3s ease',
          opacity: isOpen ? '0' : '1'
        }}></div>
        <div style={{ 
          width: '100%', 
          height: '3px', 
          backgroundColor: '#000',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)'
        }}></div>
      </button>

      {isOpen && (
        <nav style={{
          position: 'absolute',
          top: '45px',
          left: '0',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          minWidth: '140px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)'
        }}>
          <ul style={{ 
            listStyle: 'none', 
            margin: 0, 
            padding: 0 
          }}>
            <li style={{ marginBottom: '12px' }}>
              <button 
                onClick={() => {
                  window.location.href = '/';
                  setIsOpen(false);
                }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000',
                  padding: '8px 0',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#666'}
                onMouseOut={(e) => e.currentTarget.style.color = '#000'}
              >
                HOME
              </button>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666',
                  padding: '8px 0',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                VIEW ALL
              </button>
            </li>
            <li>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666',
                  padding: '8px 0',
                  width: '100%',
                  textAlign: 'left'
                }}
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

// Sculpture data for physics system
const sculptures = [
  {
    id: 'ballchair',
    src: '/assets/drawings/Ballchair.PNG',
    alt: 'Ball Chair sculpture drawing',
    fallback: 'Ball Chair'
  },
  {
    id: 'doublenauty', 
    src: '/assets/drawings/Doublenauty.PNG',
    alt: 'Double Nauty sculpture drawing',
    fallback: 'Double Nauty'
  },
  {
    id: 'lemonchair',
    src: '/assets/drawings/Lemonchair2.PNG', 
    alt: 'Lemon Chair 2 sculpture drawing',
    fallback: 'Lemon Chair 2'
  }
];

// Physics system for bouncing sculptures
const HomePage: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Physics state for each sculpture
  const [entities, setEntities] = React.useState(() => 
    sculptures.map((sculpture, index) => ({
      id: sculpture.id,
      x: 200 + (index * 250), // Starting positions spread out
      y: 200 + (index * 50),
      vx: (Math.random() - 0.5) * 3, // Random initial velocity
      vy: (Math.random() - 0.5) * 3,
      width: 150,
      height: 150,
      isHovered: false,
      ...sculpture
    }))
  );

  // Collision detection between two entities
  const checkCollision = (entity1: any, entity2: any) => {
    const dx = (entity1.x + entity1.width/2) - (entity2.x + entity2.width/2);
    const dy = (entity1.y + entity1.height/2) - (entity2.y + entity2.height/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (entity1.width + entity2.width) / 4; // Collision radius
    
    return distance < minDistance;
  };

  // Handle collision response
  const handleCollision = (entity1: any, entity2: any) => {
    const dx = (entity1.x + entity1.width/2) - (entity2.x + entity2.width/2);
    const dy = (entity1.y + entity1.height/2) - (entity2.y + entity2.height/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { entity1, entity2 }; // Avoid division by zero
    
    // Normalize collision vector
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Relative velocity
    const dvx = entity1.vx - entity2.vx;
    const dvy = entity1.vy - entity2.vy;
    
    // Relative velocity in collision normal direction
    const dvn = dvx * nx + dvy * ny;
    
    // Don't resolve if velocities are separating
    if (dvn > 0) return { entity1, entity2 };
    
    // Collision impulse
    const impulse = 2 * dvn / 2; // Assuming equal mass
    
    return {
      entity1: {
        ...entity1,
        vx: entity1.vx - impulse * nx,
        vy: entity1.vy - impulse * ny
      },
      entity2: {
        ...entity2,
        vx: entity2.vx + impulse * nx,
        vy: entity2.vy + impulse * ny
      }
    };
  };

  // Animation loop
  React.useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      setEntities(prevEntities => {
        let updatedEntities = [...prevEntities];
        
        // Update positions and handle boundary collisions
        updatedEntities = updatedEntities.map(entity => {
          // Don't update position if hovered
          if (entity.isHovered) {
            return entity;
          }

          let newX = entity.x + entity.vx;
          let newY = entity.y + entity.vy;
          let newVx = entity.vx;
          let newVy = entity.vy;

          // Boundary collision detection
          if (newX <= 0 || newX >= containerWidth - entity.width) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(containerWidth - entity.width, newX));
          }
          
          if (newY <= 80 || newY >= containerHeight - entity.height) { // 80px for header
            newVy = -newVy;
            newY = Math.max(80, Math.min(containerHeight - entity.height, newY));
          }

          return {
            ...entity,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });

        // Handle entity-to-entity collisions
        for (let i = 0; i < updatedEntities.length; i++) {
          for (let j = i + 1; j < updatedEntities.length; j++) {
            const entity1 = updatedEntities[i];
            const entity2 = updatedEntities[j];
            
            // Skip if either is hovered
            if (entity1.isHovered || entity2.isHovered) continue;
            
            if (checkCollision(entity1, entity2)) {
              const collision = handleCollision(entity1, entity2);
              updatedEntities[i] = collision.entity1;
              updatedEntities[j] = collision.entity2;
            }
          }
        }
        
        return updatedEntities;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Handle hover states
  const handleMouseEnter = (id: string) => {
    setEntities(prev => 
      prev.map(entity => 
        entity.id === id 
          ? { ...entity, isHovered: true }
          : entity
      )
    );
  };

  const handleMouseLeave = (id: string) => {
    setEntities(prev => 
      prev.map(entity => 
        entity.id === id 
          ? { ...entity, isHovered: false }
          : entity
      )
    );
  };

  return (
    <main 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {entities.map(entity => (
        <div
          key={entity.id}
          style={{
            position: 'absolute',
            left: `${entity.x}px`,
            top: `${entity.y}px`,
            width: `${entity.width}px`,
            height: `${entity.height}px`,
            cursor: 'pointer',
            transition: entity.isHovered ? 'transform 0.2s ease' : 'none',
            transform: entity.isHovered ? 'scale(1.1)' : 'scale(1)',
            zIndex: entity.isHovered ? 10 : 1
          }}
          onMouseEnter={() => handleMouseEnter(entity.id)}
          onMouseLeave={() => handleMouseLeave(entity.id)}
        >
          <img
            src={entity.src}
            alt={entity.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              userSelect: 'none',
              filter: entity.isHovered 
                ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' 
                : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              const parent = img.parentElement;
              if (parent) {
                parent.innerHTML = `<div style="width: 100%; height: 100%; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: #666; font-weight: 500; background: rgba(0,0,0,0.02);">${entity.fallback}</div>`;
              }
            }}
          />
        </div>
      ))}
    </main>
  );
};

function App() {
  console.log('App component rendering...');
  
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;