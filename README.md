# GoTravel

## Introduction

GoTravel is a modern web platform designed for searching, planning, and sharing travel experiences. Built with cutting-edge web technologies, GoTravel provides travelers with a comprehensive solution to discover adventure tours, plan team-building activities, read guest reviews, and access safety commitments for their journeys. The platform features a responsive design with multi-language support, making travel planning accessible to users worldwide.

Whether you're looking for featured tours, adventure experiences, or team-building activities, GoTravel offers an intuitive interface that helps you find and book your perfect travel experience.

## Features

- **🌍 Multi-language Support**: Full internationalization with English and Vietnamese language support
- **🏔️ Adventure Tours**: Browse and discover exciting adventure tour packages
- **⭐ Featured Tours**: Curated selection of premium travel experiences
- **👥 Team Building**: Specialized team-building activities and corporate travel solutions
- **📝 Guest Reviews**: Read authentic reviews from fellow travelers
- **🛡️ Safety Commitment**: Comprehensive safety information and commitments for all tours
- **❓ FAQ Section**: Detailed frequently asked questions and answers
- **🔍 Advanced Search**: Powerful search functionality to find the perfect travel experience
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI/UX**: Clean, intuitive interface built with modern design principles

## Technologies Used

- **Frontend Framework**: [Next.js 15.3.4](https://nextjs.org/) - React-based framework for production-ready applications
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript development
- **Styling**: 
  - [Tailwind CSS 4.1.11](https://tailwindcss.com/) - Utility-first CSS framework
  - CSS/SCSS - Custom styling and component-specific styles
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest) - Server state management
- **Internationalization**: [Next-intl](https://next-intl-docs.vercel.app/) - Type-safe internationalization
- **UI Components**: [Swiper](https://swiperjs.com/) - Modern carousel and slider component
- **Development Tools**:
  - ESLint - Code linting and quality assurance
  - PostCSS - CSS processing and optimization
- **Runtime**: Node.js with React 19

## Installation & Usage Guide

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/linhngocdao/GoTravel.git
cd GoTravel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Running in Production

After building, start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Project Structure

```
GoTravel/
├── public/                 # Static assets and images
├── src/
│   ├── app/               # Next.js App Router pages and layouts
│   │   └── [locale]/      # Internationalized routes
│   ├── components/        # Reusable React components
│   │   └── Clients/       # Client-side components
│   │       ├── ui/        # UI components (buttons, search, etc.)
│   │       └── layout/    # Layout-specific components
│   ├── config/            # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization setup
│   ├── lib/               # Utility libraries and functions
│   ├── store/             # State management
│   ├── styles/            # Global styles and CSS modules
│   ├── types/             # TypeScript type definitions
│   └── utilities/         # Helper functions and constants
├── messages/              # Translation files
│   ├── en/               # English translations
│   └── vi/               # Vietnamese translations
├── docs/                  # Project documentation
└── package.json          # Project dependencies and scripts
```

## Contribution Guidelines

We welcome contributions to GoTravel! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the code style guidelines
4. Ensure all tests pass and code passes linting
5. Commit your changes with descriptive messages
6. Push to your fork and submit a pull request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add appropriate comments for complex logic
- Ensure responsive design compatibility
- Follow the existing project structure
- Use Tailwind CSS classes for styling consistency

### Pull Request Process

1. Ensure your code builds successfully (`npm run build`)
2. Run linting checks (`npm run lint`) and fix any issues
3. Update documentation if necessary
4. Provide a clear description of changes in the pull request
5. Link any related issues in the pull request description

### Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Screenshots (if applicable)

## License

This project is currently under development. License information will be updated upon official release.

---

**GoTravel** - Making travel planning simple, safe, and enjoyable for everyone.
