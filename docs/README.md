# SCULPTURELANDIA Interactive Art Gallery

## Project Summary
An interactive art gallery website featuring floating 2D drawings that bounce around like a screensaver, with each drawing linking to detailed sculpture pages.

## Quick Start
```bash
# Initialize the project (Phase 1)
npm create vite@latest sculpturelandia -- --template react-ts
cd sculpturelandia
npm install react-router-dom @react-spring/web @use-gesture/react
npm install -D sass @types/node
npm run dev
```

## Documentation

### 📋 [Tech Stack & Architecture](./tech-stack-and-architecture.md)
Detailed analysis of the recommended technology stack and system architecture, including:
- React 18 + TypeScript + Vite
- React Spring for physics-based animations
- Component hierarchy and data flow
- Performance optimization strategies

### 🗺️ [Development Plan](./development-plan.md)
Complete 7-phase development roadmap from setup to deployment:
1. **Foundation** - Project setup and basic structure
2. **UI Components** - Header, menu, routing
3. **Static Display** - Position drawings without animation
4. **Physics System** - Implement bouncing and collision detection
5. **Interactions** - Add hover states and polish
6. **Content** - Real photos and descriptions  
7. **Deployment** - Launch and optimization

## Key Features

### Core Functionality
- **Responsive Company Header**: SCULPTURELANDIA button spans full width, scales responsively
- **Physics Animation**: 3 drawings bounce around the screen like a screensaver
- **Collision Detection**: Drawings bounce off each other and window edges without overlapping
- **Hover Interactions**: Drawings pause when hovered, resume when unhovered
- **Navigation**: Each drawing links to its detailed sculpture page
- **Mobile Friendly**: Responsive design works across all devices

### Technical Highlights
- **60fps Animations**: Smooth performance using requestAnimationFrame
- **Custom Physics**: Velocity-based movement with realistic collision responses
- **Component Architecture**: Reusable, maintainable React components
- **TypeScript**: Full type safety throughout the codebase
- **Accessibility**: Keyboard navigation and screen reader support

## Current Assets
Located in `/public/assets/drawings/` directory:
- `Ballchair.PNG` - 2D drawing of ball chair sculpture
- `Doublenauty.PNG` - 2D drawing of double knot sculpture  
- `Lemonchair2.PNG` - 2D drawing of lemon chair sculpture

**Asset Organization**: See [asset-organization.md](./asset-organization.md) for complete directory structure and guidelines for adding new assets.

## Next Steps
1. **Follow the Development Plan**: Start with Phase 1 (Project Setup)
2. **Set up the development environment** using the recommended tech stack
3. **Build incrementally** - each phase delivers working functionality
4. **Test frequently** on multiple devices and browsers
5. **Add more drawings** once the initial 3 are working perfectly

## Success Criteria
- ✅ All drawings animate smoothly without performance issues
- ✅ Perfect collision detection (no overlapping or stuck drawings)
- ✅ Responsive design works on mobile, tablet, and desktop
- ✅ Intuitive navigation between gallery and sculpture detail pages
- ✅ Professional, polished user experience

## Technical Requirements
- **Node.js** 16+ (for Vite development server)
- **Modern Browser** with ES6+ support
- **Mobile Testing** capability for responsive validation

---

**Ready to start building?** Begin with Phase 1 of the [Development Plan](./development-plan.md) to set up your development environment and create the foundation for your interactive art gallery.
