import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import sculptureData from './data/sculptures.json';

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
// Load sculpture data from JSON file
const sculptures = Object.values(sculptureData.sculptures).map(sculpture => ({
  id: sculpture.id,
  src: sculpture.drawingPath,
  alt: `${sculpture.title} sculpture drawing`,
  fallback: sculpture.title
}));

// Physics system for bouncing sculptures
const HomePage: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Physics state for each sculpture
  const [entities, setEntities] = React.useState(() => 
    sculptures.map((sculpture, index) => ({
      ...sculpture,
      x: 200 + (index * 250), // Starting positions spread out
      y: 200 + (index * 50),
      vx: (Math.random() - 0.5) * 4, // Slightly higher velocity for better collisions
      vy: (Math.random() - 0.5) * 4,
      width: 150,
      height: 150,
      isHovered: false
    }))
  );

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
  
  if (!sculpture) {
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

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        marginBottom: '60px',
        alignItems: 'center'
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
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
              borderRadius: '12px'
            }}
          />
        </div>

        {/* Title and Description */}
        <div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            {sculpture.title}
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            lineHeight: '1.6',
            color: '#666',
            marginBottom: '32px'
          }}>
            {sculpture.description}
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {hasContent(sculpture.artist) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Artist
                </h3>
                <p style={{ color: '#666' }}>{sculpture.artist}</p>
              </div>
            )}
            
            {hasContent(sculpture.year) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Year
                </h3>
                <p style={{ color: '#666' }}>{sculpture.year}</p>
              </div>
            )}
            
            {hasContent(sculpture.materials) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Materials
                </h3>
                <p style={{ color: '#666' }}>{sculpture.materials}</p>
              </div>
            )}
            
            {hasContent(sculpture.dimensions) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Dimensions
                </h3>
                <p style={{ color: '#666' }}>{sculpture.dimensions}</p>
              </div>
            )}
            
            {hasContent(sculpture.price) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Price
                </h3>
                <p style={{ color: '#666' }}>{sculpture.price}</p>
              </div>
            )}
            
            {hasContent(sculpture.availability) && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>
                  Availability
                </h3>
                <p style={{ color: '#666' }}>{sculpture.availability}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Artist Statement and Details - only show if any content exists */}
      {(hasContent(sculpture.artistStatement) || hasContent(sculpture.inspiration) || hasContent(sculpture.process) || hasContent(sculpture.technicalNotes)) && (
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            marginBottom: '40px'
          }}>
            <div>
              {/* Artist Statement - only show if content exists */}
              {hasContent(sculpture.artistStatement) && (
                <>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#000',
                    marginBottom: '16px'
                  }}>
                    Artist Statement
                  </h2>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#666',
                    marginBottom: '24px'
                  }}>
                    {sculpture.artistStatement}
                  </p>
                </>
              )}
              
              {/* Inspiration - only show if content exists */}
              {hasContent(sculpture.inspiration) && (
                <>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#000',
                    marginBottom: '12px'
                  }}>
                    Inspiration
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#666'
                  }}>
                    {sculpture.inspiration}
                  </p>
                </>
              )}
            </div>
            
            <div>
              {/* Creative Process - only show if content exists */}
              {hasContent(sculpture.process) && (
                <>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#000',
                    marginBottom: '12px'
                  }}>
                    Creative Process
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#666',
                    marginBottom: '24px'
                  }}>
                    {sculpture.process}
                  </p>
                </>
              )}
              
              {/* Technical Notes - only show if content exists */}
              {hasContent(sculpture.technicalNotes) && (
                <>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#000',
                    marginBottom: '12px'
                  }}>
                    Technical Notes
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#666'
                  }}>
                    {sculpture.technicalNotes}
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Exhibition History */}
          {hasContent(sculpture.exhibitions) && (
            <div style={{
              borderTop: '1px solid #eee',
              paddingTop: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#000',
                marginBottom: '16px'
              }}>
                Exhibition History
              </h3>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {sculpture.exhibitions.map((exhibition, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {exhibition}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Awards */}
          {hasContent(sculpture.awards) && (
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#000',
                marginBottom: '16px'
              }}>
                Recognition
              </h3>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {sculpture.awards.map((award, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Photo Gallery Section - only show if photos exist */}
      {hasContent(sculpture.photos) && (
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Sculpture Photography
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {sculpture.photos.map((photo, index) => (
              <div
                key={index}
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px dashed #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  padding: '20px'
                }}
              >
                {/* Photo placeholder with metadata */}
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Photo Placeholder
                  </div>
                  <div style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                    {photo.caption}
                  </div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    marginTop: '8px',
                    color: '#aaa'
                  }}>
                    Path: {photo.src}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;