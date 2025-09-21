import React from 'react';
import { useNavigate } from 'react-router-dom';
import sculptureData from '../../data/sculptures.json';
import './ViewAllPage.scss';

const ViewAllPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get all sculptures and filter out metadata
  const sculptures = Object.values(sculptureData.sculptures)
    .filter((item): item is any => 'id' in item && 'drawingPath' in item && 'title' in item)
    .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

  const handleSculptureClick = (sculptureId: string) => {
    navigate(`/sculpture/${sculptureId}`);
  };

  return (
    <main className="view-all-page">
      <div className="view-all-content">
        <div className="page-header">
          <h1>All Sculptures</h1>
          <p>Explore the complete SCULPTURELANDIA collection</p>
        </div>

        <div className="sculptures-list">
          {sculptures.map((sculpture, index) => (
            <div
              key={sculpture.id}
              className="sculpture-item"
              onClick={() => handleSculptureClick(sculpture.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSculptureClick(sculpture.id);
                }
              }}
            >
              <div className="sculpture-image">
                <img
                  src={sculpture.drawingPath}
                  alt={`${sculpture.title} sculpture drawing`}
                  loading="lazy"
                  className="sculpture-drawing"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="image-placeholder">${sculpture.title}</div>`;
                    }
                  }}
                />
              </div>
              
              <div className="sculpture-info">
                <h2 className="sculpture-title">{sculpture.title}</h2>
                <p className="sculpture-year">{sculpture.year}</p>
                <div className="sculpture-hover-hint">
                  <span>Click to view details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="page-navigation">
          <button 
            onClick={() => navigate('/')}
            className="nav-button secondary"
          >
            ← Back to Gallery
          </button>
        </div>
      </div>
    </main>
  );
};

export default ViewAllPage;