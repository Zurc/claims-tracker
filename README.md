# ClaimsTracker

An insurance claims management portal built with React and Express. Submit, track, and manage insurance claims with a modern, responsive interface.

## Features

- **Submit Claims** - Create new insurance claims with type, incident date, and description
- **Track Status** - Monitor claim progress (Submitted, Under Review, Approved, Denied)
- **View Details** - Access detailed information for each claim
- **Responsive Design** - Mobile-first UI with dark mode support
- **10 Claim Types** - Auto collision, water damage, fire damage, medical expenses, and more

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui component library
- TanStack React Query for data fetching
- React Hook Form with Zod validation
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon serverless)

## Project Structure

```
ClaimsTracker/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── pages/          # Page components
│       ├── hooks/          # Custom hooks
│       └── lib/            # Utilities
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── db.ts              # Database connection
├── shared/                 # Shared types/schemas
│   └── schema.ts
└── netlify/               # Serverless functions
```

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or use Neon serverless)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ClaimsTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your database connection string in `.env`.

4. Push the database schema:
   ```bash
   npm run db:push
   ```

## Running the Application

### Development

Run both client and server concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
npm run dev:server   # Express server only
npm run dev:client   # Vite dev server only
```

The application will be available at `http://localhost:8000`.

### Production

Build and start the production server:
```bash
npm run build
npm start
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run client and server concurrently |
| `npm run dev:server` | Run Express server with hot reload |
| `npm run dev:client` | Run Vite dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/claims` | Get all claims |
| GET | `/api/claims/:id` | Get claim by ID |
| POST | `/api/claims` | Create new claim |

### Create Claim Request Body

```json
{
  "claimType": "Auto Collision",
  "dateOfIncident": "2024-01-15",
  "description": "Rear-end collision at intersection"
}
```

## Deployment

This project is configured for Netlify deployment with serverless functions. Deploy by connecting your repository to Netlify or using the Netlify CLI.

## License

MIT
