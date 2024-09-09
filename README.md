# Rankflow

Rankflow is a Next.js application that connects to Webflow's CMS, allowing users to manage and optimize their content for search engines using AI.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v7 or later)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/rankflow.git
   cd rankflow
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to `.env.local`
   - Fill in the required values (see [Environment Variables](#environment-variables) section)

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

NEXT_PUBLIC_SITE_URL=http://localhost:3000
LOGTO_ENDPOINT=your_logto_endpoint
LOGTO_APP_ID=your_logto_app_id
LOGTO_APP_SECRET=your_logto_app_secret
LOGTO_COOKIE_SECRET=your_logto_cookie_secret

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint for code quality
- `npm run format`: Run Prettier for code formatting

## Project Structure

- `app/`: Contains the Next.js app router pages and layouts
- `components/`: Reusable React components
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configuration

## Coding Standards

This project uses ESLint and Prettier for code linting and formatting. The configuration files are:

- `.eslintrc.json`: ESLint configuration
- `.prettierrc`: Prettier configuration

We use husky and lint-staged to enforce coding standards before commits.

## Deployment

This project is set up for deployment on Vercel. The `next.config.js` file includes the necessary configuration for a standalone output.

To deploy:

1. Push your changes to the main branch
2. Vercel will automatically deploy the new version

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them using conventional commit messages
4. Push to your fork and submit a pull request

Please make sure your code adheres to the existing style and passes all tests.

For more detailed guidelines, please refer to the `CONTRIBUTING.md` file.
