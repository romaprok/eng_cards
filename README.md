# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

current stack:

- react
- typescript
- vite
- zustand
- react-query
- tailwind
- sccs
- react-testing-library
- eslint
- prettier
- git hooks
- ci/cd
- vercel
- heroku

## Upcoming Features

### Frontend (UI/UX)

- [ ] User profile page with stats and settings
- [ ] Create, edit, and delete vocabulary playlists
- [ ] Add, edit, and remove cards in playlists
- [ ] Flashcard learning mode (flip cards, self-check)
- [ ] Quiz mode with scoring and progress tracking
- [ ] Search and filter playlists and cards
- [ ] Responsive mobile-first UI
- [ ] Dark mode toggle

### Data Persistence

- [ ] Local storage integration for playlists and cards

### Backend & Cloud (planned for later)

- [ ] Sync data to cloud (optional backend integration)
- [ ] User authentication (sign up, login, logout)

## Future CI/CD Improvements

- [ ] Add automated tests (unit/integration tests with Jest, React Testing Library)
- [ ] Add end-to-end (E2E) tests (e.g., Cypress, Playwright)
- [ ] Set up code coverage reporting and enforce thresholds
- [ ] Implement security checks (e.g., npm audit, codeql)
- [ ] Add performance budgets (e.g., Lighthouse CI)
- [ ] Configure branch protection rules in GitHub
- [ ] Set up notifications for failed builds/deploys (e.g., Slack, Discord)
- [ ] Review and manage environment variables for all environments
- [ ] Add manual approval steps for production deployments
