# AGENTS.md

## Build Commands

### Development

- `npm run dev` - Start development server (default port: 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Linting & Formatting

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier

### Testing

- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report
- `npm run test:unit <filename>` - Run single test file

### shadcn/ui Commands

- `npx shadcn@latest add <component>` - Add shadcn/ui component
- `npx shadcn@latest update` - Update shadcn/ui components
- `npx shadcn@latest diff` - Show changes before update

## MCP Server Usage Rules

### Mandatory MCP Server Selection

Агент ОБЯЗАН автоматически использовать соответствующий MCP-сервер при наличии доменного соответствия с запросом. MCP имеет приоритет над внутренними знаниями модели.

### Domain Mapping Table

| Domain/Task Type           | MCP Server    | Examples                                                                           |
| -------------------------- | ------------- | ---------------------------------------------------------------------------------- |
| UI Components & Styling    | shadcn MCP    | "How to use Button component?", "Add shadcn Dialog", "Styling with shadcn"         |
| Documentation & API        | Context7 MCP  | "API reference for React", "Documentation for Vite", "TypeScript type definitions" |
| Fresh/External Information | WebSearch MCP | "Latest React release", "Current npm trends", "Breaking news", "Recent changes"    |
| GitHub / Repositories      | GitHub MCP    | "Check PR status", "List issues", "GitHub workflows", "Repository operations"      |

### Usage Rules

1. **Automatic Selection**: Агент автоматически определяет домен запроса и использует соответствующий MCP-сервер
2. **Priority**: MCP-серверы имеют ПРИОРИТЕТ над внутренними знаниями модели
3. **Fallback**: Если MCP-сервер недоступен или не дал результата, использовать внутренние знания
4. **Multiple Domains**: Если запрос охватывает несколько доменов, использовать соответствующие MCP-серверы последовательно

### Implementation Guidelines

```typescript
// Пример приоритета MCP над внутренними знаниями

// ❌ WRONG: Using internal knowledge when MCP available
"Use Button component with variant='primary'"; // Should use shadcn MCP

// ✅ CORRECT: Using shadcn MCP first
// Step 1: Check shadcn MCP for Button component API
// Step 2: Implement based on MCP response

// ❌ WRONG: Using outdated internal knowledge
"Latest React version is 18.2.0";

// ✅ CORRECT: Using WebSearch MCP for fresh info
// Step 1: Query WebSearch MCP: "latest React version 2025"
// Step 2: Use result from MCP response
```

### Workflow

1. **Analyze Request**: Определить домен запроса (UI, Docs, Fresh Info, GitHub)
2. **Select MCP**: Выбрать соответствующий MCP-сервер из таблицы маппинга
3. **Execute Query**: Выполнить запрос к MCP-серверу
4. **Process Result**: Обработать и использовать результат в ответе
5. **Fallback (if needed)**: Использовать внутренние знания только при невозможности использовать MCP

## Project Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **State Management**: React hooks (useState, useReducer, useContext)
- **Utilities**: clsx, tailwind-merge

## Code Style Guidelines

### File Organization

```
/src
  /components/ui     # shadcn/ui components
  /components        # App-specific components
  /lib               # Utilities and helpers
  /hooks             # Custom React hooks
  /types             # TypeScript types
  /App.tsx           # Main app component
  /main.tsx          # Entry point
  /index.css         # Global styles (Tailwind)
```

### Component Structure

- Use functional components with TypeScript
- Props interfaces defined before component
- Use React.memo for list items to prevent unnecessary re-renders
- Keep components focused and single-responsibility

### Naming Conventions

- **Components**: PascalCase (e.g., `CategoryBlock`, `ModelItem`)
- **Files**: PascalCase matching component name (e.g., `CategoryBlock.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePriceData`, `useJsonFile`)
- **Types/Interfaces**: PascalCase (e.g., `PriceConfig`, `PriceData`)
- **Variables/Functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (if global)

### Imports

```typescript
// 1. React and core libraries
import React, { useState, useCallback } from "react";

// 2. Third-party libraries
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// 3. Internal components
import { CategoryBlock } from "@/components/CategoryBlock";

// 4. Types and utilities
import type { PriceData } from "@/types";
import { cn } from "@/lib/utils";
```

### TypeScript Guidelines

- Always define interfaces/types for component props
- Use `type` for simple unions and `interface` for object shapes
- Prefer explicit typing over inference for exported APIs
- Use `type` for React component props

Example:

```typescript
interface CategoryBlockProps {
  category: string;
  models: Model;
  onDeleteCategory: (category: string) => void;
  onUpdatePrice: (
    path: string[],
    field: keyof PriceConfig,
    value: number | null,
  ) => void;
}
```

### State Management

- Use `useState` for simple local state
- Use `useReducer` for complex state logic (e.g., priceData mutations)
- Use `useContext` for global state if needed
- Always use immutable updates (spread operator or structuralClone)

```typescript
// Good - immutable update
setPriceData((prev) => ({
  ...prev,
  [category]: {
    ...prev[category],
    [model]: {
      ...prev[category][model],
      [config]: {
        ...prev[category][model][config],
        [field]: value,
      },
    },
  },
}));
```

### Error Handling

- Always validate user inputs before processing
- Show toast notifications for errors and success states
- Try-catch around file operations and JSON parsing
- Validate JSON structure on file load

```typescript
try {
  const data = JSON.parse(content);
  if (!validatePriceData(data)) {
    toast.error("Invalid data structure");
    return;
  }
  setPriceData(data);
  toast.success("File loaded successfully");
} catch (error) {
  toast.error("Failed to parse JSON file");
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Compact spacing: gap-2, gap-3, gap-4 and p-2, p-3, p-4
- Border radius: rounded-md, rounded-lg, rounded-xl
- Primary gradient: `bg-gradient-to-r from-purple-500 to-purple-700`
- Use `cn()` utility for conditional classes

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'p-4 rounded-lg border',
  isActive && 'bg-purple-50 border-purple-200'
)}>
```

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar: collapsible on mobile, fixed on desktop
- Grid: grid-cols-1 on mobile, grid-cols-3 on desktop for price fields

```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
```

### Accessibility

- Use semantic HTML elements
- Add labels to form inputs
- Ensure keyboard navigation works
- Use aria-labels when needed

### Performance

- Use `React.memo` for list items
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive computations
- Debounce search/filter inputs (if added)

## Data Structure

```typescript
interface PriceConfig {
  purchase_entry: number; // Required, >= 0
  wholesale_small: number | null; // Optional, >= 0 or null
  market: number | null; // Optional, >= 0 or null
}

interface Configuration {
  [configName: string]: PriceConfig;
}

interface Model {
  [modelName: string]: Configuration;
}

interface Category {
  [modelName: string]: Model;
}

interface PriceData {
  [categoryName: string]: Category;
}
```

## Required shadcn/ui Components

- `button` - All buttons (load, save, add, delete)
- `input` - Text and number inputs
- `label` - Form labels
- `select` - Dropdown selects for categories/models
- `card` - Category and model cards
- `alert-dialog` - Delete confirmation modals
- `collapsible` - Expandable sections (sidebar, models)
- `toast` - Success/error notifications
- `separator` - Visual dividers
- `scroll-area` - Scrollable data area

## Key Features

1. **File Operations**
   - Load JSON file via `<input type="file">`
   - Save JSON as download with timestamp filename
   - FileReader API for reading files
   - Blob API for generating downloads

2. **Data Management**
   - Hierarchical display: Category → Model → Configuration → Prices
   - Real-time price editing
   - Add/delete categories, models, configurations
   - Validate duplicates and negative numbers

3. **UI/UX**
   - Compact, minimalist design
   - Full responsiveness (mobile-first)
   - Toast notifications for all actions
   - Confirmation dialogs for deletions
   - Collapsible sidebar for adding items

## Development Workflow

1. Before starting new feature:
   - Check if shadcn/ui component exists
   - Review existing patterns in similar components
   - Define TypeScript types first

2. When modifying state:
   - Always use immutable updates
   - Batch related state updates
   - Use proper error handling

3. Before committing:
   - Run `npm run lint` and fix issues
   - Run `npm run format`
   - Run `npm run test` if applicable
   - Test responsive design at different breakpoints

## Common Patterns

### Custom Hook for File Operations

```typescript
export function useJsonFile() {
  const loadFile = useCallback((file: File): Promise<PriceData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  const saveFile = useCallback((data: PriceData) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `price-config-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return { loadFile, saveFile };
}
```

### Confirmation Dialog Pattern

```typescript
const [deleteTarget, setDeleteTarget] = useState<{type: string, name: string} | null>(null);

const handleDelete = () => {
  if (deleteTarget) {
    // Perform delete
    setDeleteTarget(null);
    toast.success('Item deleted');
  }
};

<AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
  <AlertDialogContent>
    <AlertDialogTitle>Delete {deleteTarget?.type}?</AlertDialogTitle>
    <AlertDialogDescription>
      Are you sure you want to delete "{deleteTarget?.name}"?
    </AlertDialogDescription>
    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
  </AlertDialogContent>
</AlertDialog>
```

## Validation Rules

- **Category names**: Non-empty, unique across all categories
- **Model names**: Non-empty, unique within category
- **Config names**: Non-empty, unique within model
- **Prices**: Numeric, >= 0, purchase_entry is required
- **JSON files**: Must be valid JSON, match PriceData structure

## Color Scheme

- Primary: Purple gradient (#667eea → #764ba2)
- Success: #10b981
- Danger: #ef4444
- Background: #f8fafc
- Text: #1e293b
- Border: #e2e8f0

## 🔄 Version Control & Branch Management (NEW)

### Git Workflow Requirements

- **MUST Use Version Control**: All changes must be tracked in Git
- **Feature Branches**: Create separate branch for each new feature or bug fix
  - Format: `feature/feature-name` or `fix/issue-description`
  - Example: `feature/responsive-mobile-design` or `fix/validation-errors`
- **Main Branch Protection**: NEVER commit directly to main/master branch
- **Code Review Required**: All changes must be reviewed before merge
- **Version Tags**: Create version tags for releases (v1.0.0, v1.1.0, etc.)

### Git Workflow Process

1. **Before starting work**:
   - Create new feature branch: `git checkout -b feature/your-feature-name`
   - Pull latest changes: `git pull origin main`
2. **During development**:
   - Commit frequently with descriptive messages
   - Use conventional commit format: `type(scope): description`
   - Examples: `feat(responsive): add mobile optimization`, `fix(validation): prevent negative prices`
3. **Before merging**:
   - Run all tests: `npm run test`
   - Build successfully: `npm run build`
   - Fix all linting: `npm run lint:fix`
   - Format code: `npm run format`
   - Push to feature branch: `git push origin feature/your-feature-name`
   - Create Pull Request for review

### Responsive Design Requirements

- **Mobile-First Approach**: Design for mobile screens first, then enhance for larger screens
- **Breakpoint Support**: Support all popular screen sizes:
  - Mobile: 320px (iPhone SE), 375px (iPhone 12/13), 414px (iPhone Pro Max)
  - Tablet: 768px (iPad Mini), 820px (iPad), 1024px (iPad landscape)
  - Desktop: 1280px (laptop), 1440px+ (large desktop)
- **Touch Targets**: Minimum 44px touch targets for mobile devices
- **Responsive Testing**: Test on all breakpoints before merge

### Merge Requirements

- **Testing**: All features must have tests before merge
- **Documentation**: Update documentation for API changes
- **Changelog**: Update CHANGELOG.md with new features and fixes
- **Version Bump**: Update package.json version if needed
- **Clean Merge**: Ensure merge commit is clean and descriptive

### Version Management

- **Semantic Versioning**: Follow SemVer (MAJOR.MINOR.PATCH)
- **Release Process**:
  1. Update version in package.json
  2. Update CHANGELOG.md
  3. Create Git tag: `git tag v1.0.0`
  4. Push tags: `git push origin --tags`
  5. Create GitHub Release
