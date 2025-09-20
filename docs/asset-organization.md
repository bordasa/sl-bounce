# SCULPTURELANDIA - Asset Organization

## Directory Structure

The project assets are organized in the `public/assets/` directory for optimal scalability and maintainability:

```
public/
├── assets/
│   ├── drawings/           # 2D sculpture drawings (current: 3 files)
│   │   ├── Ballchair.PNG
│   │   ├── Doublenauty.PNG
│   │   └── Lemonchair2.PNG
│   ├── photos/             # High-res sculpture photos (Phase 6)
│   │   ├── ballchair-1.jpg
│   │   ├── ballchair-2.jpg
│   │   ├── doublenauty-1.jpg
│   │   └── ...
│   └── icons/              # UI icons and graphics
│       └── (future icons)
└── vite.svg               # Vite default assets
```

## Asset Paths

All asset paths in the code use absolute paths from the public directory:

### 2D Drawings
- **Path Format**: `/assets/drawings/{filename}.PNG`
- **Usage**: Referenced in `src/data/sculptures.ts` for the floating gallery
- **Current Files**: 
  - `/assets/drawings/Ballchair.PNG`
  - `/assets/drawings/Doublenauty.PNG` 
  - `/assets/drawings/Lemonchair2.PNG`

### Sculpture Photos (Phase 6)
- **Path Format**: `/assets/photos/{sculpture-name}-{number}.jpg`
- **Usage**: Multiple photos per sculpture for detail pages
- **Examples**:
  - `/assets/photos/ballchair-1.jpg`
  - `/assets/photos/doublenauty-2.jpg`
  - `/assets/photos/lemonchair2-3.jpg`

### Icons (Future)
- **Path Format**: `/assets/icons/{icon-name}.{ext}`
- **Usage**: UI elements, hamburger menu graphics, etc.

## Benefits of This Organization

### Scalability
- Easy to add new asset categories without cluttering
- Clear separation between different asset types
- Scales well as the gallery grows

### Maintainability  
- Predictable file locations
- Easy to find and update assets
- Clear naming conventions

### Performance
- Assets served directly by Vite from public directory
- No import/bundling overhead for large images
- Optimal for image optimization in production

### Development Experience
- Clear folder structure in IDE
- Easy to drag-and-drop new assets
- Consistent naming patterns

## Adding New Assets

### New 2D Drawings
1. Place PNG files in `/public/assets/drawings/`
2. Add sculpture data entry in `src/data/sculptures.ts`
3. Use path format: `/assets/drawings/{filename}.PNG`

### Sculpture Photos
1. Place JPG files in `/public/assets/photos/`
2. Update the `photos` array in sculpture data
3. Use naming: `{sculpture-id}-{number}.jpg`

### UI Icons
1. Place icon files in `/public/assets/icons/`
2. Import in components using `/assets/icons/{filename}`

## Image Optimization (Phase 7)

### Recommended Formats
- **2D Drawings**: PNG (transparency support)
- **Photos**: WebP with JPG fallback
- **Icons**: SVG (scalable) or PNG (small)

### Size Guidelines
- **Drawings**: 200-400px max dimension (responsive scaling)
- **Photos**: 1200px max width (detail pages)
- **Icons**: 24-48px standard sizes

---

## Content Management System (JSON-Based)

### Overview
The SCULPTURELANDIA website uses a JSON-based content management system that separates content from code. This allows for easy updates without requiring code changes or technical knowledge.

### Core File: `src/data/sculptures.json`

All sculpture information is stored in a single JSON file with rich metadata:

```json
{
  "sculptures": {
    "sculpture-id": {
      "id": "sculpture-id",
      "title": "Sculpture Name",
      "artist": "Artist Name",
      "year": "2024",
      "materials": "Materials description",
      "dimensions": "W × H × D measurements",
      "weight": "Weight with units", 
      "price": "$X,XXX",
      "availability": "Available/Sold/Reserved",
      "edition": "Limited edition info",
      "description": "Main description paragraph",
      "artistStatement": "Artist's personal statement",
      "technicalNotes": "Construction details",
      "inspiration": "Creative inspiration",
      "process": "Creation process description",
      "drawingPath": "/assets/drawings/filename.PNG",
      "photos": [
        {
          "src": "/assets/photos/sculpture-hero.jpg",
          "alt": "Alt text for accessibility",
          "caption": "Photo caption"
        }
      ],
      "tags": ["tag1", "tag2", "tag3"],
      "featured": true/false,
      "dateCreated": "YYYY-MM-DD",
      "exhibitions": ["Exhibition 1", "Exhibition 2"],
      "awards": ["Award 1", "Award 2"]
    }
  }
}
```

### How to Add a New Sculpture

#### Step 1: Prepare Assets
1. **2D Drawing**: Save as PNG in `/public/assets/drawings/`
   - Naming: `sculptureId.PNG` (e.g., `newchair.PNG`)
   - Size: 200-400px max dimension

2. **Photos**: Save as JPG in `/public/assets/photos/`
   - Naming: `sculptureId-description.jpg` 
   - Examples: `newchair-hero.jpg`, `newchair-detail.jpg`
   - Size: 1200px max width

#### Step 2: Add to sculptures.json

Open `src/data/sculptures.json` and add a new entry in the "sculptures" object:

```json
{
  "sculptures": {
    "existing-sculpture-1": { ... },
    "existing-sculpture-2": { ... },
    "newchair": {
      "id": "newchair",
      "title": "New Chair Design",
      "artist": "SCULPTURELANDIA Collective",
      "year": "2024",
      "materials": "Walnut wood, brass hardware",
      "dimensions": "24\" × 18\" × 30\" (61cm × 46cm × 76cm)",
      "weight": "15 lbs (6.8 kg)",
      "price": "$1,200",
      "availability": "Available",
      "edition": "Series of 20",
      "description": "This chair represents a new direction in our furniture design, combining traditional woodworking with modern aesthetics...",
      "artistStatement": "The New Chair emerged from my fascination with...",
      "technicalNotes": "Constructed using traditional joinery techniques...",
      "inspiration": "Inspired by the natural curves found in...",
      "process": "Each chair begins with carefully selected walnut...",
      "drawingPath": "/assets/drawings/newchair.PNG",
      "photos": [
        {
          "src": "/assets/photos/newchair-hero.jpg",
          "alt": "New Chair in studio lighting",
          "caption": "Hero shot showcasing the walnut grain"
        },
        {
          "src": "/assets/photos/newchair-detail.jpg",
          "alt": "Close-up of New Chair brass hardware",
          "caption": "Hand-forged brass joinery detail"
        },
        {
          "src": "/assets/photos/newchair-lifestyle.jpg",
          "alt": "New Chair in modern home setting", 
          "caption": "The chair in its natural environment"
        }
      ],
      "tags": ["furniture", "wood", "chair", "modern", "handcrafted"],
      "featured": true,
      "dateCreated": "2024-09-14",
      "exhibitions": [],
      "awards": []
    }
  }
}
```

#### Step 3: Update Metadata (Optional)

Update the metadata section at the bottom:

```json
"metadata": {
  "lastUpdated": "2024-09-14",
  "version": "1.1.0",
  "totalSculptures": 4,
  "curator": "SCULPTURELANDIA Content Team"
}
```

#### Step 4: Deploy Changes

1. **Development**: Changes appear immediately in development server
2. **Production**: Redeploy the website (see deployment-plan.md)

### Content Fields Explained

#### Required Fields
- **id**: Unique identifier (used in URLs, no spaces/special chars)
- **title**: Display name of the sculpture
- **drawingPath**: Path to the 2D drawing file

#### Rich Content Fields
- **description**: Main paragraph about the piece (shows prominently)
- **artistStatement**: Personal reflection from the artist
- **technicalNotes**: Construction and material details
- **inspiration**: Creative inspiration and meaning
- **process**: How the piece was created

#### Metadata Fields
- **materials**: What it's made from
- **dimensions**: Size with units
- **price**: Current pricing
- **availability**: Current status
- **featured**: Whether to highlight this piece
- **tags**: Categories for potential filtering

#### Photos Array
Each photo object needs:
- **src**: Path to image file
- **alt**: Accessibility description
- **caption**: Displayed caption text

### Best Practices

#### Content Writing
- **Be specific**: Include actual measurements, materials, techniques
- **Tell stories**: Share the creative process and inspiration
- **Use professional language**: Match gallery standards
- **Keep it scannable**: Use shorter paragraphs for web reading

#### File Management
- **Consistent naming**: Use lowercase with hyphens
- **Optimize images**: Compress before uploading
- **Backup originals**: Keep high-res versions separately
- **Version control**: Each change is tracked in Git

#### ID Naming
- **Use lowercase**: `ballchair` not `BallChair`
- **No spaces**: Use hyphens if needed `ball-chair`
- **Be descriptive**: `lemonchair2` better than `chair1`
- **Keep it short**: URLs will use these IDs

### Troubleshooting

#### Common Issues
1. **Sculpture doesn't appear**: Check ID spelling and JSON syntax
2. **Images don't load**: Verify file paths and case sensitivity
3. **Page won't load**: JSON syntax error - use JSON validator
4. **Wrong content**: Clear browser cache after updates

#### JSON Validation
Before deploying, validate your JSON:
- Use VS Code JSON validation
- Online validators like jsonlint.com
- Check for missing commas, quotes, brackets

### Future Enhancements

#### Potential Additions to JSON Structure
- **Pricing tiers**: Different sizes/options
- **360° views**: Interactive photo arrays
- **Video content**: Links to sculpture videos
- **Related works**: Links to similar pieces
- **Purchase info**: Direct sales integration
- **Virtual reality**: VR/AR display options

This JSON-based system provides a solid foundation that can grow with your gallery's needs while keeping content management simple and code-free.

---

This organization ensures the SCULPTURELANDIA gallery remains maintainable and performant as it grows.
