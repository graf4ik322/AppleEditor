# TODO - Apple Price Manager Refactoring

## Completed ✅
- [x] Initialize React + Vite + TypeScript project with required dependencies
- [x] Set up Tailwind CSS and shadcn/ui configuration
- [x] Add all required shadcn/ui components
- [x] Create TypeScript types (PriceConfig, Configuration, Model, Category, PriceData)
- [x] Create utility functions (cn helper, validators)
- [x] Create custom hooks (useJsonFile, usePriceData, useConfirm)
- [x] Create base UI components (Header, Sidebar, EmptyState)
- [x] Create data components (CategoryBlock, ModelItem, ConfigItem)
- [x] Create form components (AddCategoryForm, AddModelForm, AddConfigForm)
- [x] Create App component with state management and routing
- [x] Fix issues in components (Sidebar, confirmation dialogs)

## Remaining Tasks ⏳
- [ ] Install dependencies: `npm install`
- [ ] Start development server: `npm run dev`
- [ ] Test all functionality:
  - [ ] Load JSON file (price-config-2026-01-10 (1).json)
  - [ ] Edit prices (purchase_entry, wholesale_small, market)
  - [ ] Add new category
  - [ ] Add new model
  - [ ] Add new configuration
  - [ ] Delete configuration with confirmation
  - [ ] Delete model with confirmation
  - [ ] Delete category with confirmation
  - [ ] Save JSON file
- [ ] Run lint: `npm run lint` (fix any issues)
- [ ] Run format: `npm run format`
- [ ] Build for production: `npm run build`
- [ ] Verify deployment readiness

## Commands Reference
```bash
# Installation
npm install

# Development
npm run dev              # Start dev server (port 5173)

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting
npm run format           # Format with Prettier

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests
npm run test:coverage    # Generate coverage
```

## Test Data File
- `price-config-2026-01-10 (1).json` - sample data to test with

## Validation Checklist
- [ ] All price fields accept numbers >= 0
- [ ] purchase_entry is required
- [ ] wholesale_small and market are optional (can be null)
- [ ] Category/model/config names must be non-empty
- [ ] Duplicate names are rejected
- [ ] JSON structure validation works
- [ ] Toast notifications appear correctly
- [ ] Confirmation dialogs appear for deletions
- [ ] File download works correctly
- [ ] Responsive design works on mobile/desktop
