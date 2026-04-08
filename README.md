# Aurum — Google OAuth Dashboard

A modern, beautiful authentication dashboard built with Next.js, TypeScript, and Tailwind CSS. Features Google OAuth 2.0 integration, Drizzle ORM for database management, and NextAuth for session handling.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Authentication**: [NextAuth.js v5](https://authjs.dev) with Google OAuth
- **Database**: [PostgreSQL](https://www.postgresql.org) with [Neon](https://neon.tech)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Deployment**: [Vercel](https://vercel.com)

## Features

✨ **Authentication**
- Google OAuth 2.0 integration
- Session management with NextAuth.js
- Protected routes and middleware

🎨 **UI/UX**
- Responsive design
- Beautiful glass morphism components
- Avatar with initials generation
- Dashboard with user stats

🗄️ **Database**
- PostgreSQL with Neon serverless
- Drizzle ORM for type-safe queries
- Automatic schema migrations

## Prerequisites

- Node.js 18+ and npm/yarn
- A PostgreSQL database (Neon recommended)
- Google OAuth credentials

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/googlelogin.git
cd googlelogin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required environment variables:**

- `DATABASE_URL` - PostgreSQL connection string from Neon
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `AUTH_SECRET` - Generate with `npx auth secret`
- `NEXTAUTH_URL` - Your application URL

### 4. Set up the database

Push the schema to your database:

```bash
npm run db:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to `.env.local`

## Setting Up Neon Database

1. Create a free account at [Neon](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string to `DATABASE_URL` in `.env.local`

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project settings (leave defaults)
5. Add environment variables:
   - `DATABASE_URL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `AUTH_SECRET`
   - `NEXTAUTH_URL` (set to your Vercel domain)
6. Click "Deploy"

### 3. Update Google OAuth credentials

After deployment, update your Google OAuth redirect URIs to include your Vercel domain:
- `https://yourdomain.vercel.app/api/auth/callback/google`

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run db:push   # Push schema to database
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   └── user/                   # User API routes
│   ├── dashboard/                  # Protected dashboard page
│   ├── error/                      # Error page
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Login page
├── components/                     # Reusable components
│   ├── Avatar.tsx
│   ├── SignInButton.tsx
│   ├── SignOutButton.tsx
│   └── StatCard.tsx
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── db.ts                       # Drizzle database setup
│   └── db/schema.ts                # Database schema
└── db/schema.ts                    # Database tables
```

## Key Files

- **`src/lib/auth.ts`** - NextAuth configuration with Google provider
- **`src/lib/db.ts`** - Drizzle ORM setup with Neon
- **`src/db/schema.ts`** - Database schema (users, accounts, sessions, verificationTokens)
- **`middleware.ts`** - Route protection middleware
- **`drizzle.config.ts`** - Drizzle Kit configuration

## Development Workflow

1. Make changes to your code
2. Test locally with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically deploys on push to main branch

## Troubleshooting

### "AUTH_SECRET is missing" error
Run `npx auth secret` to generate a secret and add it to `.env.local`

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check network access in Neon dashboard
- Ensure IP whitelist includes your current IP

### Google OAuth errors
- Verify Client ID and Secret are correct
- Check redirect URIs match your domain exactly
- Ensure Google+ API is enabled

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `25987...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `GOCSPX-...` |
| `AUTH_SECRET` | NextAuth encryption secret | Generate with `npx auth secret` |
| `NEXTAUTH_URL` | Your app URL | `https://yourdomain.vercel.app` |

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
