import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import sculptureData from './data/sculptures.json';
import ViewAllPage from './components/ViewAllPage/ViewAllPage';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';

console.log('App.tsx loading...');

// Note: All TypeScript interfaces are inferred from sculptures.json structure
// This includes Photo interface for photo arrays and Sculpture interface for sculpture data

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


// Sculpture data for physics system
// Load sculpture data from JSON file
const sculptures = Object.values(sculptureData.sculptures)
  .filter((item): item is any => 'id' in item && 'drawingPath' in item && 'title' in item) // Filter out metadata and invalid entries
  .map(sculpture => ({
    id: sculpture.id,
    src: sculpture.drawingPath,
    alt: `${sculpture.title} sculpture drawing`,
    fallback: sculpture.title
  }));

// Physics system for bouncing sculptures
const HomePage: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Physics state for each sculpture - initialized with random positions
  const [entities, setEntities] = React.useState(() => {
    // Get initial window dimensions (fallback to reasonable defaults)
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return sculptures.map((sculpture) => ({
      ...sculpture,
      x: Math.random() * Math.max(0, windowWidth - 150), // Random position across full width
      y: 80 + Math.random() * Math.max(0, windowHeight - 230), // Random position below header (80px) 
      vx: (Math.random() - 0.5) * 2, // Reduced speed by 50% (was 4, now 2)
      vy: (Math.random() - 0.5) * 2, // Reduced speed by 50% (was 4, now 2)
      width: 150,
      height: 150,
      isHovered: false
    }));
  });

  // Collision detection between two entities
  const checkCollision = (entity1: any, entity2: any) => {
    const dx = (entity1.x + entity1.width/2) - (entity2.x + entity2.width/2);
    const dy = (entity1.y + entity1.height/2) - (entity2.y + entity2.height/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (entity1.width + entity2.width) / 3; // Larger collision radius for better detection
    
    return distance < minDistance;
  };

  // Handle collision response - simplified and more reliable
  const handleCollision = (entity1: any, entity2: any) => {
    // Get center positions
    const x1 = entity1.x + entity1.width/2;
    const y1 = entity1.y + entity1.height/2;
    const x2 = entity2.x + entity2.width/2;
    const y2 = entity2.y + entity2.height/2;
    
    // Calculate collision angle
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) {
      // If objects are exactly on top of each other, separate them randomly
      const angle = Math.random() * Math.PI * 2;
      return {
        entity1: {
          ...entity1,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2
        },
        entity2: {
          ...entity2,
          vx: -Math.cos(angle) * 2,
          vy: -Math.sin(angle) * 2
        }
      };
    }
    
    // Normalize collision direction
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Simple elastic collision - swap velocity components along collision normal
    const speed1 = Math.sqrt(entity1.vx * entity1.vx + entity1.vy * entity1.vy);
    const speed2 = Math.sqrt(entity2.vx * entity2.vx + entity2.vy * entity2.vy);
    const avgSpeed = (speed1 + speed2) / 2;
    
    // Apply new velocities based on collision normal
    const bounceStrength = Math.max(2, avgSpeed * 0.8);
    
    return {
      entity1: {
        ...entity1,
        vx: -nx * bounceStrength,
        vy: -ny * bounceStrength
      },
      entity2: {
        ...entity2,
        vx: nx * bounceStrength,
        vy: ny * bounceStrength
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
        
        // Calculate expanded boundaries - 20% larger than window with minimums for mobile
        const minBoundaryWidth = 600; // Minimum boundary for very small screens
        const minBoundaryHeight = 400; // Minimum boundary for very small screens
        const boundaryPadding = 0.1; // 10% expansion beyond window size
        
        const boundaryWidth = Math.max(minBoundaryWidth, containerWidth * (1 + boundaryPadding * 2));
        const boundaryHeight = Math.max(minBoundaryHeight, containerHeight * (1 + boundaryPadding * 2));
        
        // Offset boundaries so they're centered on the window
        const boundaryOffsetX = -(boundaryWidth - containerWidth) / 2;
        const boundaryOffsetY = -(boundaryHeight - containerHeight) / 2;
        
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

          // Boundary collision detection with expanded boundaries
          if (newX <= boundaryOffsetX || newX >= boundaryOffsetX + boundaryWidth - entity.width) {
            newVx = -newVx;
            newX = Math.max(boundaryOffsetX, Math.min(boundaryOffsetX + boundaryWidth - entity.width, newX));
          }
          
          if (newY <= 80 + boundaryOffsetY || newY >= boundaryOffsetY + boundaryHeight - entity.height) { // 80px for header
            newVy = -newVy;
            newY = Math.max(80 + boundaryOffsetY, Math.min(boundaryOffsetY + boundaryHeight - entity.height, newY));
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

  // Handle sculpture click
  const handleSculptureClick = (id: string) => {
    navigate(`/sculpture/${id}`);
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
          onClick={() => handleSculptureClick(entity.id)}
        >
          <img
            src={entity.src}
            alt={entity.alt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              userSelect: 'none',
              filter: entity.isHovered 
                ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2)) brightness(1.1)' 
                : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              transition: 'filter 0.2s ease'
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

// Helper function to check if content exists and is not empty
const hasContent = (value: any): boolean => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value != null && value !== '';
};

// Individual Sculpture Page Component
const SculpturePage: React.FC = () => {
  const navigate = useNavigate();
  const { id: sculptureId } = useParams<{ id: string }>();
  
  // Find the sculpture data from JSON
  const sculpture = sculptureData.sculptures[sculptureId as keyof typeof sculptureData.sculptures];
  
  // Type guard to ensure we have a valid sculpture (not metadata)
  if (!sculpture || !('id' in sculpture) || !('drawingPath' in sculpture) || !('title' in sculpture)) {
    return (
      <main style={{
        minHeight: '100vh',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 20px'
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: '#000', marginBottom: '16px' }}>
            Sculpture Not Found
          </h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>
            The requested sculpture could not be found.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Back to Gallery
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '100px',
      padding: '100px 40px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '32px',
          padding: '8px 16px',
          fontSize: '14px',
          backgroundColor: 'transparent',
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.color = '#000';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666';
        }}
      >
        ← Back to Gallery
      </button>

      {/* Hero Section - Coming Soon */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh',
        gap: '40px'
      }}>
        {/* 2D Drawing */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={sculpture.drawingPath}
            alt={`${sculpture.title} sculpture drawing`}
            loading="lazy"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
              borderRadius: '12px'
            }}
          />
        </div>

        {/* Title and Coming Soon Message */}
        <div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            {sculpture.title}
          </h1>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            color: '#666',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            Coming Soon
          </div>
          
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#999',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Detailed information and gallery photos for this piece are coming soon. 
            Please come back soon to see more from SCULPTURELANDIA.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '32px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000'}
        >
          Back to Interactive Gallery
        </button>
      </div>
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
          <Route path="/sculpture/:id" element={<SculpturePage />} />
          <Route path="/view-all" element={<ViewAllPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;