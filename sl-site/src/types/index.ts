// Core data types for SCULPTURELANDIA

export interface Sculpture {
  id: string;
  title: string;
  description: string;
  drawingPath: string; // Path to 2D drawing in public folder
  photos: string[];    // Array of paths to sculpture photos
  artist?: string;
  year?: number;
  materials?: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'in' | 'm';
  };
}

export interface DrawingEntity {
  id: string;
  position: Vector2D;
  velocity: Vector2D;
  size: {
    width: number;
    height: number;
  };
  mass: number;
  isHovered: boolean;
  sculpture: Sculpture;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface WindowBounds {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface PhysicsConfig {
  gravity: number;
  friction: number;
  bounciness: number;
  maxVelocity: number;
  collisionDamping: number;
}

export interface CollisionResult {
  hasCollision: boolean;
  separation?: Vector2D;
  newVelocity1?: Vector2D;
  newVelocity2?: Vector2D;
}

// Route parameter types
export interface SculpturePageParams {
  id: string;
}

// Component prop types
export interface FloatingDrawingProps {
  entity: DrawingEntity;
  onHover: (id: string, isHovered: boolean) => void;
  onClick: (sculptureId: string) => void;
}

export interface FloatingGalleryProps {
  sculptures: Sculpture[];
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Animation and physics hook types
export interface UsePhysicsOptions {
  entities: DrawingEntity[];
  boundaries: WindowBounds;
  physicsConfig: PhysicsConfig;
  isPaused?: boolean;
}

export interface UsePhysicsReturn {
  entities: DrawingEntity[];
  updateEntity: (id: string, updates: Partial<DrawingEntity>) => void;
  pauseEntity: (id: string) => void;
  resumeEntity: (id: string) => void;
  resetPositions: () => void;
}

// Responsive breakpoints
export enum Breakpoint {
  Mobile = 768,
  Tablet = 1024,
  Desktop = 1200
}

export interface ResponsiveConfig {
  drawingCount: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  drawingSize: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  animationSpeed: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}
