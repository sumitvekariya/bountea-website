# GitHub OAuth Setup Guide

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Fill in the application details:
   - **Application name**: `BounTEA Website`
   - **Homepage URL**: `http://localhost:3000` (for development) or your production URL
   - **Application description**: `GitHub authentication for BounTEA bounty management system`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (for development)

3. Click "Register application"
4. Copy the **Client ID** and generate a **Client Secret**

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the environment variables in `.env.local`:
   ```env
   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here
   
   # GitHub OAuth App Credentials (for website login)
   GH_APP_CLIENT_ID=your-github-client-id
   GH_APP_CLIENT_SECRET=your-github-client-secret
   
   # GitHub App ID (for repository access - optional)
   GH_APP_ID=your-github-app-id
   ```

## Step 3: GitHub App Setup (Optional)

If you want to access user repositories via a GitHub App:

1. Go to [GitHub Settings > Developer settings > GitHub Apps](https://github.com/settings/apps/new)
2. Create a new GitHub App with repository permissions
3. Copy the App ID to the `GH_APP_ID` environment variable

**Note:** The OAuth app (for login) and GitHub App (for repo access) are different. You only need the OAuth app for basic authentication.

## Step 4: Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy this value to the `NEXTAUTH_SECRET` environment variable.

## Step 5: Update Callback URLs for Production

When deploying to production, update the GitHub OAuth app settings:
- **Homepage URL**: `https://yourdomain.com`
- **Authorization callback URL**: `https://yourdomain.com/api/auth/callback/github`

And update your `.env.local` or production environment:
```env
NEXTAUTH_URL=https://yourdomain.com
```

## Step 6: Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Sign in" button in the navigation
4. You should be redirected to GitHub for authentication
5. After successful authentication, you'll be redirected back to the homepage

## Features Included

- ✅ GitHub OAuth authentication
- ✅ Session management with 30-day expiry
- ✅ User profile integration in navbar
- ✅ Automatic session persistence
- ✅ TypeScript support for GitHub user data

## Troubleshooting

### Common Issues:

1. **"Invalid redirect_uri"**: Make sure the callback URL in GitHub OAuth app matches exactly with your `NEXTAUTH_URL`
2. **"Invalid client"**: Double-check your `GH_APP_CLIENT_ID` and `GH_APP_CLIENT_SECRET`
3. **Session not persisting**: Ensure `NEXTAUTH_SECRET` is set and consistent across restarts
4. **HTTPS required in production**: Make sure to use HTTPS URLs for production deployments

### Debug Mode:

Set `NEXTAUTH_DEBUG=true` in your environment to see detailed logs during development.
