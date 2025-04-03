# website-new

This is the repository for the TutorCruncher website, built using [Next.js](https://nextjs.org/) and integrated with [Prismic](https://prismic.io/) for content management.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/website-new.git
cd website-new
npm install
```

Run the development server:

```
npm run dev
```

Open http://localhost:8000 in your browser to see the application.

## Scripts

The following scripts are available in the package.json:

- `npm run dev:` Start the development server.
- `npm run build:` Build the application for production.
- `npm run start:` Start the production server.
- `npm run slicemachine:` Start the prismic development server
- `npm run format:` Run Prettier to format code.
- `npm run lint:` Run ESLint to check for code quality issues.

## Environment Variables

The project uses a .env file to manage environment variables. Ensure you have the variables configured from the `.env.sample` file.
