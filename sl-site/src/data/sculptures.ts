// Simple sculpture data - no external imports for now

interface Sculpture {
  id: string;
  title: string;
  description: string;
  drawingPath: string;
  photos: string[];
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

// Initial sculpture data for the 3 drawings
export const sculptures: Sculpture[] = [
  {
    id: 'ballchair',
    title: 'Ball Chair',
    description: 'A modern interpretation of the classic ball chair form, exploring themes of comfort and geometric abstraction.',
    drawingPath: '/assets/drawings/Ballchair.PNG',
    photos: [
      '/assets/photos/ballchair-1.jpg',
      '/assets/photos/ballchair-2.jpg',
      '/assets/photos/ballchair-3.jpg'
    ],
    artist: 'SCULPTURELANDIA Artist',
    year: 2024,
    materials: ['Steel', 'Fabric', 'Foam'],
    dimensions: {
      width: 120,
      height: 140,
      depth: 120,
      unit: 'cm'
    }
  },
  {
    id: 'doublenauty',
    title: 'Double Nauty',
    description: 'An intricate exploration of nautical forms and their relationship to mathematical infinity, rendered in contemporary materials.',
    drawingPath: '/assets/drawings/Doublenauty.PNG',
    photos: [
      '/assets/photos/doublenauty-1.jpg',
      '/assets/photos/doublenauty-2.jpg',
      '/assets/photos/doublenauty-3.jpg'
    ],
    artist: 'SCULPTURELANDIA Artist',
    year: 2024,
    materials: ['Bronze', 'Rope', 'Resin'],
    dimensions: {
      width: 80,
      height: 200,
      depth: 80,
      unit: 'cm'
    }
  },
  {
    id: 'lemonchair',
    title: 'Lemon Chair 2',
    description: 'The second iteration in the lemon chair series, blending organic citrus forms with functional furniture design.',
    drawingPath: '/assets/drawings/Lemonchair2.PNG',
    photos: [
      '/assets/photos/lemonchair2-1.jpg',
      '/assets/photos/lemonchair2-2.jpg',
      '/assets/photos/lemonchair2-3.jpg'
    ],
    artist: 'SCULPTURELANDIA Artist',
    year: 2024,
    materials: ['Fiberglass', 'Paint', 'Steel Frame'],
    dimensions: {
      width: 90,
      height: 110,
      depth: 85,
      unit: 'cm'
    }
  }
];

// Helper function to get sculpture by ID
export const getSculptureById = (id: string): Sculpture | undefined => {
  return sculptures.find(sculpture => sculpture.id === id);
};

// Helper function to get all sculpture IDs
export const getSculptureIds = (): string[] => {
  return sculptures.map(sculpture => sculpture.id);
};

export default sculptures;