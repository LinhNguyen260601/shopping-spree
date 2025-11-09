# Shopping Spree - E-Commerce Platform

A modern, production-ready e-commerce application built with React 19, TypeScript, and Vite. This project implements a full-featured shopping platform with authentication, product management, cart functionality, and user profiles.

## 🏗️ Architecture Overview

### Tech Stack

- **Framework**: React 19.1.1 with TypeScript 5.9
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.3 (with lazy loading and data loaders)
- **State Management**: React Context API + TanStack Query 5.90
- **Styling**: Tailwind CSS 4.1.14
- **Forms**: React Hook Form 7.64 + Yup 1.7.1
- **Internationalization**: i18next 25.6.0 (English/Vietnamese)
- **Animations**: Framer Motion 12.23
- **UI Components**: Custom component library with Storybook
- **Testing**: Vitest 4.0.6 + Testing Library + Playwright
- **Code Quality**: ESLint 9.37 + Prettier 3.6

### Project Structure

```
src/
├── @types/          # TypeScript type augmentations
├── assets/          # Static assets (images, etc.)
├── components/      # Reusable UI components
│   ├── Avatar/
│   ├── Button/
│   ├── FormField/
│   ├── Pagination/
│   └── ...          # Each component has its own directory with:
│                    # - Component file (.tsx)
│                    # - Stories file (.stories.tsx)
│                    # - Tests
│                    # - Index export
├── constants/       # Application constants (paths, query keys, etc.)
├── contexts/        # React Context providers
├── guards/          # Route protection logic
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization configuration
├── layouts/         # Page layout components
│   ├── MainLayout/
│   ├── RegisterLayout/
│   ├── CartLayout/
│   └── RootLayout/
├── locales/         # Translation files (en/, vi/)
├── pages/           # Route-level page components
│   ├── Login/
│   ├── Register/
│   ├── ProductList/
│   ├── ProductDetails/
│   ├── Cart/
│   └── User/
├── services/        # API service layer
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── user.service.ts
│   └── ...
├── styles/          # Global styles
├── test/            # Test setup and utilities
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ (recommended: v20+)
- **Package Manager**: npm, yarn, pnpm, or bun
- **Git**: For version control

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shopee-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory (if needed):

   ```env
   VITE_API_URL=your-api-url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script                    | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Start development server with HMR                    |
| `npm run build`           | Build for production (TypeScript check + Vite build) |
| `npm run preview`         | Preview production build locally                     |
| `npm run lint`            | Run ESLint to check code quality                     |
| `npm run lint:fix`        | Auto-fix ESLint issues                               |
| `npm run prettier`        | Check code formatting                                |
| `npm run prettier:fix`    | Auto-format code with Prettier                       |
| `npm run test`            | Run Vitest in watch mode                             |
| `npm run coverage`        | Generate test coverage report                        |
| `npm run storybook`       | Start Storybook on port 6006                         |
| `npm run build-storybook` | Build static Storybook site                          |

## 🏛️ Architecture Patterns

### Routing Strategy

The application uses React Router v7 with:

- **Lazy loading** for code splitting
- **Route loaders** for data fetching
- **Protected routes** via route guards
- **Nested layouts** for consistent UI structure

```typescript
// Example route structure
{
  path: '/user',
  element: <ProtectedRoute />,
  children: [
    {
      path: 'profile',
      lazy: () => import('@/pages/User/pages/Profile'),
      loader: userService.getProfile
    }
  ]
}
```

### State Management

- **Server State**: TanStack Query for API data caching and synchronization
- **Client State**: React Context API for authentication and cart state
- **Form State**: React Hook Form for form management

### Data Fetching

All API calls are abstracted through service layers:

```typescript
// services/product.service.ts
export const productService = {
  getProducts: (params: ProductListParams) => {
    return http.get<SuccessResponse<Product[]>>('/products', { params })
  }
}
```

Services use a centralized HTTP client (`utils/http.ts`) with:

- Request/response interceptors
- Automatic token injection
- Error handling
- TypeScript type safety

### Component Architecture

Components follow a consistent structure:

- **Atomic Design**: Components are organized by complexity
- **Composition**: Small, focused, reusable components
- **Props Interface**: All components have explicit TypeScript interfaces
- **Storybook**: Each component has corresponding stories for documentation

### Styling Approach

- **Tailwind CSS v4**: Utility-first CSS framework
- **CSS Modules**: For component-specific styles (when needed)
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for future implementation

## 🔐 Authentication & Authorization

### Route Guards

- **ProtectedRoute**: Requires authentication (redirects to login)
- **RejectedRoute**: Requires no authentication (redirects to home if logged in)

### Authentication Flow

1. User credentials validated via `auth.service.ts`
2. Access token stored in localStorage
3. Token injected automatically via HTTP interceptor
4. User state managed in `AppContext`
5. Route guards enforce access control

## 🌐 Internationalization (i18n)

The application supports multiple languages:

- **English (en)**
- **Vietnamese (vi)** (default)

### Adding Translations

1. Add translation keys to `src/locales/{lang}/{namespace}.json`
2. Use in components:

   ```typescript
   import { useTranslation } from 'react-i18next'

   const { t } = useTranslation('namespace')
   return <h1>{t('key')}</h1>
   ```

### Namespaces

- `common`: Shared translations
- `home`, `product`, `productList`: Feature-specific
- `login`, `register`, `cart`, `user`: Page-specific
- `header`, `footer`: Layout-specific

## 🧪 Testing Strategy

### Unit & Integration Tests

- **Framework**: Vitest with Testing Library
- **Environment**: happy-dom for fast DOM simulation
- **Coverage**: V8 coverage provider

### Component Testing

- **Storybook**: Visual component testing
- **Vitest + Playwright**: Browser-based testing for Storybook stories
- **Accessibility**: @storybook/addon-a11y for a11y testing

### Running Tests

```bash
# Watch mode
npm run test

# Coverage report
npm run coverage

# Storybook tests (browser-based)
npm run test -- --project=storybook
```

## 📦 Build & Optimization

### Code Splitting

The build configuration uses manual chunk splitting for optimal loading:

- `react-vendor`: React core libraries
- `react-router`: Routing library
- `form-libs`: Form handling libraries
- `ui-libs`: UI animation and interaction libraries
- `query-libs`: Data fetching libraries
- `utils`: Utility libraries

### Bundle Analysis

After building, check `stats.html` for bundle analysis (generated by rollup-plugin-visualizer).

### Performance Considerations

- **Lazy Loading**: Routes and heavy components are code-split
- **Image Optimization**: WebP format for assets
- **Tree Shaking**: Unused code automatically removed
- **Minification**: Production builds are minified

## 🛠️ Development Guidelines

### Code Style

- **ESLint**: Enforces code quality and React best practices
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Strict mode enabled for type safety

### Component Best Practices

1. **Semantic HTML**: Use appropriate HTML elements (`<article>`, `<section>`, etc.)
2. **Accessibility**: Include ARIA attributes when needed, proper labels
3. **Performance**: Avoid inline functions in JSX, use `useCallback`/`useMemo` when appropriate
4. **Composition**: Prefer composition over prop drilling
5. **Type Safety**: All props and state should be typed

### File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `ProductList.tsx`)
- **Utilities**: camelCase (`format.ts`, `http.ts`)
- **Constants**: UPPER_SNAKE_CASE for values, camelCase for files
- **Types**: PascalCase with `.type.ts` suffix

### Import Organization

```typescript
// 1. External dependencies
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Internal absolute imports (@/)
import { Button } from '@/components'
import { productService } from '@/services'

// 3. Relative imports
import './Component.css'
```

## 🔍 Key Features

### User Features

- ✅ User authentication (login/register)
- ✅ Product browsing and search
- ✅ Product details with reviews
- ✅ Shopping cart management
- ✅ User profile management
- ✅ Purchase history
- ✅ Password change

### Developer Features

- ✅ TypeScript for type safety
- ✅ Component Storybook documentation
- ✅ Comprehensive test coverage
- ✅ ESLint + Prettier for code quality
- ✅ Hot Module Replacement (HMR)
- ✅ Error boundaries for graceful error handling
- ✅ Loading states and skeletons
- ✅ Toast notifications

## 📚 Additional Resources

### Documentation

- [React Router v7 Docs](https://reactrouter.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Storybook Docs](https://storybook.js.org/)

### Project-Specific

- Component documentation: Run `npm run storybook`
- API services: See `src/services/` directory
- Route definitions: See `src/router.tsx`
- Constants: See `src/constants/` directory

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Kill process on port 5173
npx kill-port 5173
```

**TypeScript errors after dependency update**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Storybook not loading**

```bash
# Rebuild Storybook
npm run build-storybook
```

**Test coverage not generating**

```bash
# Ensure @vitest/coverage-v8 is installed
npm install -D @vitest/coverage-v8
```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the code style guidelines
3. Write/update tests as needed
4. Run linting and tests: `npm run lint && npm run test`
5. Commit with descriptive messages
6. Create a pull request

## 📄 License

[Specify your license here]

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
