# SCULPTURELANDIA - Quick Setup Guide

## For New Developers

If you need to recreate this project from scratch, follow these exact steps:

### Prerequisites
- Node.js 16+ installed
- Modern browser for testing
- Code editor with TypeScript support

### Step-by-Step Setup

#### 1. Initialize Project
```bash
# Create project directory
cd /path/to/your/projects
mkdir sl-site && cd sl-site

# Initialize Vite React TypeScript project
npm create vite@latest . -- --template react-ts
npm install
```

#### 2. Install Dependencies
```bash
# Core animation and routing dependencies
npm install react-router-dom @react-spring/web @use-gesture/react

# Development dependencies
npm install -D sass @types/node
```

#### 3. Create Project Structure
```bash
# Component directories
mkdir -p src/components/Header
mkdir -p src/components/FloatingGallery  
mkdir -p src/components/FloatingDrawing
mkdir -p src/components/HamburgerMenu
mkdir -p src/components/SculpturePage

# Architecture directories
mkdir -p src/hooks src/utils src/styles src/data src/types

# Asset organization
mkdir -p public/assets/drawings
mkdir -p public/assets/photos
mkdir -p public/assets/icons

# Documentation
mkdir -p docs
```

#### 4. Copy Key Files
You'll need to recreate these critical files (see full project for content):

**Required Files:**
- `src/types/index.ts` - Complete TypeScript definitions
- `src/data/sculptures.ts` - Sculpture data structure
- `src/styles/variables.scss` - SCSS variables and mixins
- `src/styles/global.scss` - Global styles and responsive design
- `src/App.tsx` - Main application with routing
- `src/main.tsx` - Entry point with SCSS import

**Asset Files:**
- Place your `.PNG` drawing files in `public/assets/drawings/`
- Update paths in `src/data/sculptures.ts`

#### 5. Start Development
```bash
npm run dev
```
- Open `http://localhost:5173/`
- Should see SCULPTURELANDIA header and working menu

### Verification Checklist
- [ ] Development server starts without errors
- [ ] SCULPTURELANDIA header displays and scales responsively
- [ ] Hamburger menu opens/closes with navigation links
- [ ] All routes (HOME, VIEW ALL, ABOUT) navigate correctly
- [ ] No TypeScript errors in IDE
- [ ] No Sass compilation errors

### Common Issues & Solutions

**Sass Mixin Errors:**
- Ensure using `@import './variables.scss';` not `@use`
- Variables should use `$variable-name` not `vars.$variable-name`

**Asset Loading Issues:**
- Verify PNG files are in `public/assets/drawings/`
- Check paths in `sculptures.ts` match actual file locations
- Ensure file names match exactly (case-sensitive)

**Routing Issues:**
- Verify React Router dependencies installed
- Check all routes defined in `App.tsx`
- Ensure BrowserRouter wraps entire app

### Next Steps After Setup
1. Follow development plan Phase 2 for UI components
2. Implement floating animation system in Phase 4
3. Add real content and photos in Phase 6

This setup creates the complete foundation for the SCULPTURELANDIA interactive gallery.
