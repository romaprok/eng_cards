# English Vocabulary Cards App

A modern, interactive vocabulary learning application built with React and TypeScript. Features beautiful 3D card flip animations and spaced repetition learning system to help users master English vocabulary effectively.

## 🚀 Features

- ✅ **Interactive Flashcards** - Beautiful 3D flip animations powered by Framer Motion
- ✅ **Spaced Repetition System** - Smart learning algorithm with 6h/48h review intervals
- ✅ **Playlist Management** - Create, edit, and organize vocabulary collections
- ✅ **Progress Tracking** - Visual progress indicators and card status tracking
- ✅ **Responsive Design** - Mobile-first UI with Tailwind CSS
- ✅ **Keyboard Navigation** - Full keyboard support (Space/Enter to flip cards)
- ✅ **Modern Animations** - Smooth transitions and micro-interactions

## 🛠️ Tech Stack

### **Core Framework & Build Tools**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)

### **State Management & Routing**

- **Zustand** - Lightweight state management for playlists and cards
- **React Router DOM** - Client-side routing and navigation

### **Styling & Animations**

- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Framer Motion** - Production-ready motion library for React
  - 3D card flip animations with hardware acceleration
  - Smooth page transitions and micro-interactions
  - Spring physics for natural motion feel

### **Development Tools**

- **ESLint** - Code linting with TypeScript and React rules
- **Prettier** - Code formatting with consistent style
- **Husky** - Git hooks for pre-commit quality checks
- **Commitlint** - Conventional commit message enforcement

### **Package Management**

- **Yarn** - Fast, reliable package manager

## 🎨 Animation Features

The app leverages **Framer Motion** for enhanced user experience:

- **3D Card Flips** - Realistic card rotation with perspective and backface visibility
- **Entrance Animations** - Smooth page and component mounting transitions
- **Interactive Feedback** - Hover and tap animations on buttons and cards
- **Progress Animations** - Animated progress bars and counters
- **Exit Transitions** - Graceful component unmounting animations

## 📱 Current Features

### Frontend (UI/UX)

- ✅ Create, edit, and delete vocabulary playlists
- ✅ Add, edit, and remove cards in playlists
- ✅ Flashcard learning mode with 3D flip animations
- ✅ Spaced repetition system with card status tracking
- ✅ Responsive mobile-first UI
- ✅ Progress tracking with visual indicators

### Data Persistence

- ✅ Local storage integration for playlists and cards

## 🔮 Upcoming Features

### Frontend (UI/UX)

- [ ] User profile page with stats and settings
- [ ] Quiz mode with multiple choice questions
- [ ] Search and filter playlists and cards
- [ ] Dark mode toggle
- [ ] Audio pronunciation support
- [ ] Bulk card import/export

### Backend & Cloud (planned for later)

- [ ] Sync data to cloud (optional backend integration)
- [ ] User authentication (sign up, login, logout)
- [ ] Social features (share playlists, community library)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eng_cards
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## 🔧 Future CI/CD Improvements

- [ ] Add automated tests (unit/integration tests with Jest, React Testing Library)
- [ ] Add end-to-end (E2E) tests (e.g., Cypress, Playwright)
- [ ] Set up code coverage reporting and enforce thresholds
- [ ] Implement security checks (e.g., npm audit, codeql)
- [ ] Add performance budgets (e.g., Lighthouse CI)
- [ ] Configure branch protection rules in GitHub
- [ ] Set up notifications for failed builds/deploys (e.g., Slack, Discord)
- [ ] Review and manage environment variables for all environments
- [ ] Add manual approval steps for production deployments
