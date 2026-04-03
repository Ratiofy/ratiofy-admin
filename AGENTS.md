# Project Instructions

## Project Structure

```
ratiofy-admin/
├── src/
│   ├── api/              # API client and configuration
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature modules (instruments, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main application component
├── public/               # Static assets
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Development

### Running the Development Server

```bash
npm run dev
```

## API Configuration

The API base URL is configured in `src/api/apiClient.ts`.

## TypeScript

This project uses TypeScript for type safety. Ensure you have the correct TypeScript configuration in `tsconfig.json`.