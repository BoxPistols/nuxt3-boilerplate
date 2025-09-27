# Nuxt3 Boilerplate - AI Development Guide

## Project Architecture

This is a **static site generation (SSG)** Nuxt3 project with TypeScript, configured for deployment on Vercel.

**Key Configuration:**

- `srcDir: 'src'` - All source code lives in `/src`
- `ssr: false` with `nitro.preset: 'static'` for SPA mode
- TailwindCSS with custom colors: `techBlue`, `techRed`, `techPurple`
- Japanese language default (`lang: 'ja'`)

## Development Workflow

**Build & Dev Commands:**

```bash
yarn dev          # Development server
yarn build        # Static site generation
yarn lh           # Full Lighthouse audit pipeline
yarn ci           # Clean + Lighthouse audit
```

**Lighthouse Integration:**

- Custom `scripts/lighthouse-manager.js` handles automated audits
- Results saved to `lighthouse-results/` with JST timestamps
- Use `yarn lh:view` to open latest report, `yarn lh:clean` to cleanup old reports

## Component Patterns

**File Structure:**

- Pages: `src/pages/` (auto-routing)
- Components: `src/components/`
- Layouts: `src/layouts/default.vue` (shared header/footer)
- Types: `src/types/` (TypeScript definitions)

**Naming Conventions:**

- Vue components use PascalCase: `GoogleReviews.vue`
- TypeScript types follow interface pattern: `GoogleReview`, `BusinessInfo`
- CSS classes use kebab-case with TailwindCSS utilities

## Google Places API Integration

**Environment Variables Required:**

```env
NUXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-api-key
NUXT_PUBLIC_GOOGLE_PLACE_ID=your-place-id
NUXT_PUBLIC_CORS_PROXY=https://cors-anywhere.herokuapp.com/
```

**Implementation Pattern:**

- API calls handled in `GoogleReviews.vue` component
- Types defined in `src/types/google-reviews.ts`
- Mock data fallback when API fails
- CORS proxy configured for API requests

## Styling System

**TailwindCSS Custom Theme:**

- Custom colors: `bg-techBlue`, `text-techRed`, `bg-techPurple`
- Custom animations: `animate-fade-in` (3s fade)
- Responsive design with mobile-first approach
- Backdrop blur effects: `backdrop-filter: blur(10px)`

## Quality Tools

**Linting & Formatting:**

- ESLint with TypeScript + Vue rules
- Prettier for code formatting
- Husky pre-commit hooks
- Use `yarn fix` for automated linting + formatting

**Performance Monitoring:**

- Lighthouse CI integration with custom thresholds
- Automated report generation with Japanese timestamps
- Results tracking in `lighthouse-results/` directory

## Development Notes

- **Static Generation:** All routes pre-rendered at build time
- **No SSR:** Client-side rendering for dynamic content
- **Vercel Optimized:** Zero-config deployment setup
- **Storybook:** Component development environment available (`yarn storybook`)
- **TypeScript:** Strict mode enabled with proper type definitions

## Common Tasks

**Adding New Pages:**

1. Create `.vue` file in `src/pages/`
2. Auto-routing handles URL structure
3. Use `default.vue` layout for consistent header/footer

**API Integration:**

1. Add environment variables to `nuxt.config.ts` runtimeConfig
2. Create TypeScript interfaces in `src/types/`
3. Handle CORS via configured proxy if needed

**Styling:**

1. Use existing `techBlue/Red/Purple` color scheme
2. Leverage custom animations and backdrop effects
3. Follow mobile-first responsive patterns
