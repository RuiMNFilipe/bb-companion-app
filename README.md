# Blood Bowl Companion App 🏈

A full-stack TypeScript application for managing Blood Bowl teams, players, and matches. Built with modern technologies and designed for both mobile and web platforms.

## 📖 Overview

The Blood Bowl Companion App is a comprehensive tool for Blood Bowl coaches to manage their teams, track player statistics, organize matches, and monitor team progression. The app provides a seamless experience across mobile devices and web browsers.

### ✨ Features

- **Team Management**: Create and manage multiple Blood Bowl teams
- **Player Tracking**: Detailed player statistics, skills, and injury tracking
- **Match Organization**: Schedule and track match results
- **Cross-Platform**: Native mobile apps (iOS/Android) and web application
- **Real-time Sync**: Data synchronization across all devices
- **Offline Support**: Continue using the app even without internet connection

## 🏗️ Architecture

This is a **monorepo** built with modern TypeScript tools:

```
bb-companion-app/
├── frontend/          # Expo React Native app (iOS, Android, Web)
├── backend/           # NestJS API server
├── packages/
│   ├── database/      # Prisma schema and migrations
│   └── shared/        # Shared types and utilities
└── package.json       # Workspace configuration
```

### Tech Stack

#### Frontend

- **Expo** - Cross-platform React Native framework
- **React Native** - Mobile and web UI
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Runtime type validation
- **Expo Router** - File-based navigation

#### Backend

- **NestJS** - Progressive Node.js framework
- **Prisma** - Database ORM and migrations
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **Passport** - Authentication middleware
- **Docker** - Containerization

#### Development Tools

- **Turborepo** - Monorepo build system and task runner
- **TypeScript** - End-to-end type safety
- **Zod** - Shared validation schemas
- **pnpm** - Package manager with workspace support
- **Docker Compose** - Local development environment

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Turborepo**: `npm install -g turbo`
- **Docker & Docker Compose**
- **Git**

For mobile development:

- **Expo CLI**: `npm install -g @expo/cli`
- **iOS Simulator** (macOS only) or **Android Studio**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bb-companion-app.git
cd bb-companion-app
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 3. Environment Setup

#### Backend Environment

Create `backend/.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/bb_companion?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT=3000

# CORS (for frontend)
FRONTEND_URL="http://localhost:8081"
```

#### Frontend Environment

Create `frontend/.env`:

```env
# API Configuration
EXPO_PUBLIC_API_URL="http://localhost:3000/api"

# For Android Emulator, use your machine's IP:
# EXPO_PUBLIC_API_URL="http://192.168.1.100:3000/api"
```

### 4. Database Setup

```bash
# Start PostgreSQL with Docker using Turborepo
turbo docker:up

# This will start the database and generate Prisma client
turbo docker:dev

# Alternatively, run steps manually:
# Generate Prisma client and run migrations
turbo db:generate
cd packages/database
pnpm prisma:migrate

# Seed the database with initial data
pnpm prisma:seed
```

### 5. Build Shared Packages

```bash
# Build all packages in correct dependency order using Turborepo
turbo build
```

### 6. Start Development Servers

```bash
# Start all development servers with Turborepo
turbo dev

# This runs the development task for all packages in parallel
# The turbo.json config ensures proper dependency order:
# 1. Shared packages are built first
# 2. Database is started and client generated
# 3. Backend and frontend start in development mode
```

Open additional terminal if needed:

```bash
# Database Studio (optional)
cd packages/database
pnpm prisma:studio
```

### 7. Access the Application

- **Web**: http://localhost:8081
- **Mobile**: Use Expo Go app and scan the QR code
- **API**: http://localhost:3000
- **Database Studio**: http://localhost:5555

## 📱 Mobile Development

### iOS Development

```bash
# Install iOS dependencies (macOS only)
cd frontend
npx expo run:ios
```

### Android Development

```bash
# Start Android emulator first, then:
cd frontend
npx expo run:android
```

### Expo Go (Easiest for testing)

1. Install Expo Go on your mobile device
2. Run `pnpm dev:frontend`
3. Scan the QR code with Expo Go app

## 🛠️ Development Workflow

### Turborepo Task Pipeline

This project uses **Turborepo** to orchestrate builds and tasks across the monorepo. The task pipeline is configured in `turbo.json`:

```json
{
  "tasks": {
    "docker:up": {
      "cache": false,
      "persistent": true
    },
    "docker:dev": {
      "dependsOn": ["docker:up", "db:generate"],
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "cache": false,
      "outputs": ["src/generated/**", "node_modules/.prisma/**"]
    },
    "build": {
      "dependsOn": ["^build", "db:generate"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```

### Key Task Dependencies

- 🔄 **`build`**: Depends on all dependencies being built first (`^build`) and database client generation
- 🚀 **`dev`**: Depends on all dependencies being built, then starts development servers
- 🗄️ **`docker:dev`**: Starts database and generates Prisma client before development
- 🏗️ **`db:generate`**: Generates Prisma client with proper caching of generated files

### Available Scripts

```bash
# Development
turbo dev                  # Start all development servers
turbo docker:dev           # Start database + generate client + dev servers
turbo docker:up            # Start database services only

# Building
turbo build                # Build all packages in dependency order
turbo build --filter=frontend    # Build only frontend and its dependencies
turbo build --filter=backend     # Build only backend and its dependencies

# Database
turbo db:generate          # Generate Prisma client
pnpm db:migrate            # Run database migrations (run in packages/database)
pnpm db:seed               # Seed database with sample data
pnpm db:studio             # Open Prisma Studio
pnpm db:reset              # Reset database (careful!)

# Type Safety & Quality
turbo type-check           # TypeScript check across all packages
turbo lint                 # Lint all packages
turbo lint --fix           # Fix linting issues
turbo test                 # Run all tests with proper build dependencies

# Cache Management
turbo build --force        # Force rebuild ignoring cache
turbo prune                # Remove unused dependencies
```

### Turborepo Benefits in This Project

1. **Smart Caching**: Build outputs are cached and reused across builds
2. **Parallel Execution**: Tasks run in parallel when possible
3. **Dependency Awareness**: Tasks wait for dependencies to complete
4. **Incremental Builds**: Only rebuilds what changed
5. **Remote Caching**: Can be configured for team-wide cache sharing

### Database Changes

When you modify the database schema:

```bash
cd packages/database

# 1. Update schema.prisma
# 2. Create and apply migration
pnpm prisma:migrate

# 3. Generate updated Prisma client (with Turborepo caching)
turbo db:generate

# 4. Rebuild all dependent packages
turbo build --filter=...@packages/database
```

### Adding New Dependencies

```bash
# Frontend dependencies
pnpm add package-name --filter frontend

# Backend dependencies
pnpm add package-name --filter backend

# Shared dependencies
pnpm add package-name --filter shared

# Development dependencies (root)
pnpm add -D package-name -w

# After adding dependencies, rebuild if needed
turbo build --filter=package-that-changed...
```

## 📚 Project Structure

### Frontend (`/frontend`)

```
frontend/
├── app/                   # Expo Router pages
│   ├── (tabs)/           # Tab navigation
│   ├── index.tsx         # Auth screen
│   └── _layout.tsx       # Root layout
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # API client and utilities
├── screens/              # Screen components
├── styles/               # Style definitions
└── types/                # TypeScript type definitions
```

### Backend (`/backend`)

```
backend/
├── src/
│   ├── auth/             # Authentication module
│   ├── coaches/          # Coach management
│   ├── teams/            # Team management
│   ├── common/           # Shared utilities
│   ├── database/         # Database service
│   └── main.ts           # Application entry point
├── docker/               # Docker configuration
└── test/                 # Test files
```

### Shared Packages (`/packages`)

```
packages/
├── database/             # Prisma schema and migrations
│   ├── prisma/
│   └── src/
└── shared/               # Shared types and utilities
    └── src/
        ├── types/        # TypeScript interfaces
        └── utils/        # Utility functions
```

## 🔒 Authentication Flow

The app uses JWT-based authentication:

1. User registers/logs in through the frontend
2. Backend validates credentials and returns JWT token
3. Token is stored securely (SecureStore on mobile, localStorage on web)
4. Subsequent API requests include the token in Authorization header
5. Backend validates token on protected routes

## 🌐 API Documentation

### Authentication Endpoints

```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/me          # Get current user
POST /api/auth/refresh     # Refresh JWT token
```

### Team Management

```
GET    /api/teams          # Get user's teams
POST   /api/teams          # Create new team
GET    /api/teams/:id      # Get team details
PATCH  /api/teams/:id      # Update team
DELETE /api/teams/:id      # Delete team
```

### Player Management

```
GET    /api/teams/:teamId/players     # Get team players
POST   /api/teams/:teamId/players     # Add player to team
PATCH  /api/players/:id               # Update player
DELETE /api/players/:id               # Remove player
```

## 🧪 Testing

### Running Tests

```bash
# All tests
pnpm test

# Frontend tests
pnpm test:frontend

# Backend tests
pnpm test:backend

# E2E tests
pnpm test:e2e

# Watch mode
pnpm test:watch
```

### Test Structure

- **Unit Tests**: Individual component/service testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing

## 🚀 Deployment

### Production Build

```bash
# Build all packages for production using Turborepo
turbo build

# Build specific packages with their dependencies
turbo build --filter=frontend    # Web build with dependencies
turbo build --filter=backend     # API build with dependencies

# Platform-specific builds (run in frontend directory)
cd frontend
npx expo build:web              # Web build
npx expo build:ios              # iOS build
npx expo build:android          # Android build
```

### Environment Variables

Ensure these are set in production:

- `DATABASE_URL`: Production database connection
- `JWT_SECRET`: Strong, unique secret key
- `NODE_ENV=production`
- `FRONTEND_URL`: Production frontend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Update documentation when needed
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Error

```bash
# Restart Docker containers
cd backend
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d
```

#### Metro/Expo Build Issues

```bash
cd frontend
npx expo start --clear
```

#### Type Errors After Schema Changes

```bash
# Regenerate Prisma client and rebuild dependents
turbo db:generate
turbo build --filter=...@packages/database
```

#### Turborepo Cache Issues

```bash
# Clear Turborepo cache
turbo prune

# Force rebuild without cache
turbo build --force
```

#### pnpm Workspace Issues

```bash
# Clean and reinstall
rm -rf node_modules */node_modules
pnpm install
```

### Getting Help

- 📧 Email: support@bb-companion.app
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/bb-companion-app/issues)
- 💬 Discord: [Join our community](https://discord.gg/bb-companion)

## 🎯 Roadmap

- [ ] Match history and statistics
- [ ] League management
- [ ] Player skill trees
- [ ] Push notifications
- [ ] Social features (friend challenges)
- [ ] Offline-first data sync
- [ ] Advanced analytics and reporting

---

Made with ❤️ for the Blood Bowl community
