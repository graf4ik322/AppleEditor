# Apple Price Manager

Local price manager for Apple devices - Single Page Application for viewing, editing, and managing device price lists.

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Features

- Load JSON files with price data
- Edit prices in real-time
- Add/delete categories, models, and configurations
- Save modified data as JSON
- Full responsive design (mobile-first)
- Toast notifications for all actions
- Confirmation dialogs for deletions

## Data Structure

The JSON file should follow this structure:

```json
{
  "Category Name": {
    "Model Name": {
      "Configuration Name": {
        "purchase_entry": 10000,
        "wholesale_small": null,
        "market": null
      }
    }
  }
}
```

## Price Fields

- `purchase_entry`: Purchase price (required, >= 0)
- `wholesale_small`: Small wholesale price (optional, >= 0 or null)
- `market`: Market price (optional, >= 0 or null)

## Deployment

This application can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

## License

MIT
