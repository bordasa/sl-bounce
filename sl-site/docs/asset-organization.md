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

This organization ensures the SCULPTURELANDIA gallery remains maintainable and performant as it grows.
