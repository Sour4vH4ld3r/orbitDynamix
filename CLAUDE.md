# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OrbitDynamix is a modern IT solutions company website built with React, TypeScript, and Vite. The application showcases services including web development, app development, SEO optimization, social media marketing, and pay-per-click marketing. It's designed as a corporate website with multiple pages for services, portfolio, contact, and business tools including downloadable business cards and advertisement posters.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin for fast compilation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query for server state
- **Animations**: Custom CSS animations and react-type-animation
- **Image Generation**: html2canvas for downloadable business assets
- **Fonts**: Inter and Space Grotesk from Google Fonts
- **Icons**: Lucide React

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Directory Structure
- `src/pages/` - Route components (HomePage, AboutPage, ContactPage, etc.)
- `src/components/` - Reusable components including sections and UI components
- `src/components/ui/` - shadcn/ui component library
- `src/lib/` - Utility functions and data
- `src/hooks/` - Custom React hooks

### Key Components
- **App.tsx** - Main app component with routing setup, includes 2-second loading screen with TanStack Query provider
- **HomePage.tsx** - Landing page with multiple sections (Hero, Services, Technologies, etc.)
- **Navbar.tsx** - Site navigation with responsive mobile menu
- **HeroSection.tsx** - Main hero with TypeAnimation and interactive orbital elements that respond to mouse movement
- **LoadingScreen.tsx** - Initial loading screen
- **BusinessCard.tsx** - Interactive business card generator with flip animation and html2canvas download
- **AdvertisementPoster.tsx** - Marketing poster creator with multiple social media format templates

### Data Management
- Service data is centralized in `src/lib/data.ts` with standardized service interface
- Uses TypeScript interfaces for type safety across all components
- TanStack Query for caching and state management
- No external API dependencies - all content is static/hardcoded

### Business Tools Architecture
The application includes specialized business tool pages that generate downloadable assets:
- **Image Generation Pattern**: Uses html2canvas to convert DOM elements to downloadable PNG files
- **Interactive Components**: Business card with 3D flip effects, poster templates with real-time preview
- **Asset Management**: All business assets use OrbitDynamix branding with consistent color scheme and contact information

## Styling System

### Custom CSS Classes
- `.orbit-btn` and `.orbit-btn-outline` - Custom button styles
- `.gradient-text` - Text gradient effects
- Animation classes: `animate-fade-in`, `animate-float`, `animate-orbit`, `animate-pulse-slow`

### Color Palette
OrbitDynamix brand colors defined in Tailwind config:
- `orbit-dark` (#0F1C2E) - Main dark background
- `orbit-blue` (#1E3A5F) - Secondary dark background  
- `orbit-cyan` (#00E5FF) - Primary brand accent
- `orbit-purple` (#5B3E8E), `orbit-purple-light` (#7A4EAB) - Accent colors
- `orbit-slate-dark` (#1A1F2C), `orbit-slate-light` (#2A3142) - UI component backgrounds

### Brand Contact Information
Consistent across all business tools and pages:
- **Email**: official@orbitdynamix.com
- **Phone**: +91 7908099602  
- **Website**: https://orbitdynamix.com
- **Address**: Mukundapur, Kolkata, West Bengal, India 700099

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Custom responsive layouts for hero section and navigation

## Component Patterns

### Page Structure
All pages follow this SEO-optimized pattern:
```tsx
import { Helmet } from "react-helmet-async";

const PageComponent = () => {
  return (
    <>
      <Helmet>
        <title>Page Title | OrbitDynamix</title>
        {/* SEO meta tags */}
      </Helmet>
      {/* Page content */}
    </>
  );
};
```

### Interactive Animation Patterns
- **Mouse Tracking**: HeroSection uses mouse movement to create parallax orbital effects
- **TypeAnimation**: Main hero text cycles through different value propositions
- **3D Card Flips**: BusinessCard component uses CSS transforms for interactive flip effect
- **Loading States**: Business tool image generation shows toast notifications for user feedback

### Image Generation Pattern
Business tools (BusinessCard, AdvertisementPoster) follow this pattern:
```tsx
const downloadAsImage = async (elementRef: React.RefObject<HTMLDivElement>, filename: string) => {
  // Show loading toast
  // Hide download buttons temporarily  
  // Use html2canvas to capture DOM element
  // Create and trigger download
  // Show success/error toast
};
```

### Path Aliases
Uses `@/` alias for `src/` directory (configured in vite.config.ts and tsconfig.json)

## Development Notes

### TypeScript Configuration
- Relaxed TypeScript settings: `noImplicitAny: false`, `strictNullChecks: false`
- Unused variables/parameters warnings disabled
- Skip lib check enabled for faster compilation

### ESLint Configuration
- Uses new flat config format
- React hooks rules enabled
- Unused variables rule disabled for TypeScript

### Lovable Platform Integration
- Built for Lovable development platform
- Uses `lovable-tagger` plugin in development mode
- Auto-deployment configured through Lovable

## Testing and Quality

- ESLint configured for code quality
- No test framework currently configured
- TypeScript provides compile-time type checking

## Deployment

The project is designed for deployment through Lovable's platform. For manual deployment:
1. Run `npm run build` to create production build
2. Deploy `dist/` folder to web server
3. Configure server for SPA routing (serve index.html for all routes)

## Important Architectural Notes

### Service Data Structure
Services are defined in `src/lib/data.ts` with this interface:
```typescript
interface Service {
  id: string;              // Used for routing (/services/:serviceId)
  title: string;           // Display name
  description: string;     // Short description for cards
  detailedDescription: string; // Full description for service detail pages
  image: string;           // Unsplash image URL
}
```

### Route Structure
- `/` - HomePage with all main sections
- `/about` - AboutPage 
- `/contact` - ContactPage with contact form
- `/services` - OurServices overview page
- `/services/:serviceId` - Dynamic ServiceDetailPage for each service
- `/details` - Company details and presentation information
- `/business-card` - Interactive business card generator
- `/advertisement-poster` - Marketing poster creator
- `/demo-logo` - Logo demonstration page

### Contact Information Consistency
When updating contact information, ensure consistency across:
- Footer.tsx
- ContactSection.tsx  
- ContactPage.tsx
- BusinessCard.tsx
- Details.tsx
- AdvertisementPoster.tsx (when designs are present)

### Performance Considerations
- Uses dynamic imports for html2canvas to reduce initial bundle size
- Images are from Unsplash CDN for optimal loading
- Vite's SWC plugin provides fast compilation
- No external API dependencies reduce load times