# SCULPTURELANDIA - Tech Stack & Architecture

## Project Overview
An interactive art gallery website featuring floating 2D drawings that act as a screensaver-like interface, with each drawing linking to detailed sculpture pages.

## Recommended Tech Stack

### Frontend Framework
**React 18** with **TypeScript**
- **Why**: Component-based architecture perfect for reusable elements (floating drawings, sculpture pages)
- Excellent ecosystem for animations and physics
- Strong TypeScript support for better development experience
- Great mobile/responsive support

### Build Tool & Development
**Vite**
- **Why**: Extremely fast development server and build times
- Modern ES modules support
- Excellent React integration
- Built-in TypeScript support

### Animation & Physics
**React Spring** + **@use-gesture/react**
- **Why**: Perfect balance of power and performance for physics-based animations
- Handles smooth, spring-based animations
- Gesture support for hover interactions
- Can implement custom collision detection
- Alternative: **Framer Motion** (more declarative, slightly heavier)

### Routing
**React Router v6**
- **Why**: Standard for React SPAs
- Supports nested routing for future expansion
- Excellent mobile support

### Styling
**CSS Modules** + **Sass/SCSS**
- **Why**: Component-scoped styling
- Modern CSS features
- Easy responsive design with mixins
- Alternative: **Styled Components** for JS-in-CSS approach

### State Management
**React Context** + **useReducer**
- **Why**: Sufficient for this project's complexity
- No need for Redux/Zustand initially
- Can upgrade if needed later

## High-Level Architecture

### Component Hierarchy
```
App
├── Header
│   ├── CompanyButton (SCULPTURELANDIA)
│   └── HamburgerMenu
├── Router
│   ├── HomePage
│   │   └── FloatingGallery
│   │       └── FloatingDrawing (x3+)
│   ├── SculpturePage
│   ├── ViewAllPage
│   └── AboutPage
└── GlobalStyles
```

### Key Components

#### 1. FloatingGallery Component
- Manages physics simulation for all floating drawings
- Handles collision detection between drawings
- Manages boundary collision with window edges
- Implements animation loop using `requestAnimationFrame`

#### 2. FloatingDrawing Component
- Individual animated drawing with position, velocity, size
- Handles hover states (pause/resume animation)
- Clickable routing to sculpture detail pages
- Responsive sizing based on viewport

#### 3. Physics System
- Custom hook `usePhysics` for managing:
  - Position tracking
  - Velocity calculations  
  - Collision detection algorithms
  - Boundary constraints
  - Spring animations for smooth movement

### Animation Architecture

#### Physics Properties (per drawing):
- `position: {x, y}` - Current position
- `velocity: {x, y}` - Movement speed and direction
- `size: {width, height}` - Drawing dimensions
- `mass` - For realistic collisions
- `isHovered: boolean` - Pause state

#### Collision Detection:
1. **Drawing-to-Drawing**: Circle collision detection for performance
2. **Drawing-to-Boundary**: Simple boundary checks with bounce physics
3. **Overlap Prevention**: Separation force when drawings get too close

#### Animation Loop:
```
requestAnimationFrame loop:
1. Update positions based on velocity
2. Check for collisions (drawings + boundaries)
3. Apply collision responses
4. Update component state
5. Trigger re-render
```

## Responsive Design Strategy

### Breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Adaptive Behavior:
- **Company Button**: Scales font size responsively
- **Drawings**: Scale size and reduce count on smaller screens
- **Animation Speed**: Slower on mobile for better performance
- **Menu**: Always hamburger style for consistency

## Performance Considerations

### Optimization Techniques:
1. **Canvas vs DOM**: Start with DOM, upgrade to Canvas if needed
2. **Animation Performance**: 
   - Use `transform3d` for GPU acceleration
   - Limit to 60fps max
   - Pause animations when tab not active
3. **Image Optimization**:
   - WebP format with PNG fallback
   - Responsive image sizes
   - Lazy loading for sculpture detail pages
4. **Bundle Optimization**:
   - Code splitting for routes
   - Tree shaking unused code
   - Dynamic imports for heavy components

## File Structure
```
src/
├── components/
│   ├── Header/
│   ├── FloatingGallery/
│   ├── FloatingDrawing/
│   ├── HamburgerMenu/
│   └── SculpturePage/
├── hooks/
│   ├── usePhysics.ts
│   └── useAnimation.ts
├── utils/
│   ├── collisionDetection.ts
│   └── physics.ts
├── styles/
│   ├── global.scss
│   └── variables.scss
├── data/
│   └── sculptures.ts
└── types/
    └── index.ts
```

## Alternative Tech Stack Options

### Option 2: Next.js (if SEO important)
- **Pros**: Better SEO, image optimization, API routes
- **Cons**: Overkill for this project, server complexity

### Option 3: Three.js/React Three Fiber (if 3D needed)
- **Pros**: True 3D physics, impressive visuals
- **Cons**: Steeper learning curve, larger bundle size

### Option 4: Vanilla JS + Canvas
- **Pros**: Maximum performance, full control
- **Cons**: More development time, less maintainable

## Development Phases (See development-plan.md)
The recommended approach balances modern web development practices with the specific needs of an interactive art gallery, providing smooth animations while maintaining excellent performance across all devices.
