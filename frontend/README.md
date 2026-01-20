# Worker Productivity Tracker - Frontend

AI-Powered Web Platform For Tracking and Analyzing Worker's Daily Productivity

## Features

- 📊 **Dashboard**: Real-time overview of worker productivity
- 👥 **Worker Management**: Add, edit, and manage worker profiles
- ✅ **Task Tracking**: Track daily tasks and completion status
- 📈 **Analytics**: Visualize productivity trends and patterns
- 📄 **Reports**: Generate daily, weekly, and monthly reports
- 🔐 **Authentication**: Secure login and user management

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS Modules** - Component styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration

4. Start development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── assets/         # Images, icons, styles
├── components/     # Reusable components
├── pages/          # Page components
├── services/       # API services
├── hooks/          # Custom React hooks
├── context/        # Context providers
├── utils/          # Utility functions
└── routes/         # Route configuration
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License.
