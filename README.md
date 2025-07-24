# AskBudi Frontend

The frontend application for AskBudi - a platform that provides the latest documentation and code API for LLMs, reducing token usage and improving code quality.

## Features

- 🚀 **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- 🎨 **Beautiful UI**: Designed with HeroUI components and custom styling  
- 🔐 **Authentication**: Supabase Auth integration for secure user management
- 📊 **Dashboard**: Complete API key management and usage tracking
- 💳 **Pricing**: Transparent pricing plans with billing integration
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Optimized with Next.js App Router and Turbopack

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for authentication and database)

### Installation

1. **Clone and navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3230
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── auth/           # Authentication pages (login/signup)
│   │   ├── dashboard/      # Dashboard pages (overview, API keys)
│   │   ├── pricing/        # Pricing page
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   ├── auth-form.tsx   # Authentication form component
│   │   ├── navbar.tsx      # Navigation bar
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx  
│   │   ├── footer.tsx
│   │   ├── dashboard-layout.tsx
│   │   └── api-key-management.tsx
│   └── lib/               # Utility libraries
│       ├── supabase.ts    # Supabase client configuration
│       └── api.ts         # API service layer
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.ts       # Next.js configuration
└── package.json         # Dependencies and scripts
```

## Key Components

### Authentication (`src/components/auth-form.tsx`)
- Handles login and signup flows
- Integrates with Supabase Auth
- Form validation and error handling
- Responsive design

### Dashboard (`src/components/dashboard-layout.tsx`)
- Sidebar navigation
- User profile dropdown
- Mobile-responsive layout
- Role-based access control

### API Key Management (`src/components/api-key-management.tsx`)
- Create, view, and delete API keys
- Usage tracking and quotas
- Secure key display (show/hide)
- Copy to clipboard functionality

### Landing Page Components
- **Hero Section**: Main value proposition and CTAs
- **Features Section**: Key features and integrations
- **Navbar**: Navigation with authentication links
- **Footer**: Links and company information

## Configuration

### Supabase Setup

1. **Create a new Supabase project**
2. **Set up authentication**
   - Enable email/password authentication
   - Configure redirect URLs for your domain
3. **Update environment variables** with your project URL and anon key

### Backend Integration

The frontend communicates with the backend API through the `apiService` class in `src/lib/api.ts`:

- **Authentication**: Uses Supabase session tokens
- **API Key Management**: CRUD operations for user API keys
- **Usage Tracking**: Fetches usage statistics and quotas
- **Library Search**: Search and documentation retrieval

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **HeroUI**: Modern React component library
- **Custom Themes**: Configured in `tailwind.config.js`
- **Responsive Design**: Mobile-first approach

## Development Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy**: Automatic deployments on push to main

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Docker containers
- Self-hosted servers

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key  
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

## Integration with Backend

The frontend is designed to work with the AskBudi backend API:

- **User Management**: Supabase handles authentication, backend manages user profiles
- **API Keys**: Backend creates and validates API keys
- **Usage Tracking**: Backend logs and reports API usage
- **Library Data**: Backend serves library documentation and search

### API Endpoints Used

- `GET /api/v1/user/profile` - Get user profile
- `GET /api/v1/user/api-keys` - List user's API keys
- `POST /api/v1/user/api-keys` - Create new API key
- `DELETE /api/v1/user/api-keys/:id` - Delete API key
- `GET /api/v1/user/usage` - Get usage statistics
- `GET /api/v1/libraries/search` - Search libraries
- `GET /api/v1/libraries/docs` - Get library documentation

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -am 'Add new feature'`
5. **Push to the branch**: `git push origin feature/new-feature`
6. **Submit a Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting with Next.js config
- **Component Structure**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **State Management**: React hooks and context

## Security Considerations

- **Environment Variables**: Never commit sensitive data
- **API Keys**: Secure display and storage
- **Authentication**: Supabase handles secure auth flows
- **CORS**: Configure backend CORS for your domain
- **CSP**: Consider Content Security Policy headers

## Support

- **Documentation**: [AskBudi Docs](https://askbudi.ai/docs)
- **Issues**: Report issues on GitHub
- **Email**: founders@askbudi.ai

## License

This project is part of the AskBudi monorepo owned by Juno AI Company.