# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-11

### Added

- **Responsive Design**: Complete mobile-first responsive layout
- **Mobile Sidebar**: Slide-out sidebar with overlay for mobile devices
- **Floating Action Button**: Quick add button for mobile users
- **Enhanced Breakpoints**: Support for all popular screen sizes
- **Touch Optimization**: 44px minimum touch targets for mobile
- **Adaptive Typography**: Responsive font sizes across all screen sizes
- **Version Control Rules**: Comprehensive Git workflow guidelines
- **Semantic Versioning**: Formal version management process

### Enhanced

- **Header Component**: Icon-only buttons on mobile with tooltips
- **Price Grid**: 1-2-3 column layout (mobile-tablet-desktop)
- **Form Inputs**: Optimized sizes and spacing for touch devices
- **Alert Dialogs**: Mobile-friendly dialog sizing
- **Card Components**: Responsive padding and margins
- **Button Sizing**: Adaptive button sizes per screen size

### Responsive Breakpoints

- **Mobile**: 320px (iPhone SE), 375px (iPhone 12/13), 414px (iPhone Pro Max)
- **Tablet**: 768px (iPad Mini), 820px (iPad), 1024px (iPad landscape)
- **Desktop**: 1280px (standard laptop), 1440px+ (large desktop)

### Technical

- **Custom Tailwind Config**: Added xs, tablet, laptop, desktop breakpoints
- **Improved CSS Variables**: Better responsive design system
- **Component Architecture**: Enhanced with mobile-first approach
- **Performance**: Optimized for mobile rendering

## [1.0.0] - 2026-01-11

### Added

- **Initial Release**: Complete Apple Price Manager application
- **File Operations**: JSON file load and save functionality
- **Data Management**: CRUD operations for categories, models, and configurations
- **Price Editing**: Real-time price updates with validation
- **UI Components**: Full shadcn/ui component integration
- **Toast Notifications**: Success/error messaging system
- **Confirmation Dialogs**: Safety dialogs for delete operations
- **Data Validation**: Comprehensive input validation
- **TypeScript**: Full type safety implementation
- **Responsive Layout**: Basic mobile/desktop layout
- **Collapsible Interface**: Expandable sections for better UX

### Data Structure

- **Categories**: Top-level product categories (iPhone, MacBook, iPad)
- **Models**: Product models within categories
- **Configurations**: Product variants (storage, color, etc.)
- **Price Fields**: Purchase entry, wholesale small, market prices

### Technology Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useReducer)
- **Validation**: Custom validation utilities
- **File Handling**: FileReader API and Blob API
