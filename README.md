# Clear The Points

A React-based interactive dot-clicking game where players must click numbered dots in sequential order within a time limit.

## 🎮 Game Overview

Clear The Points is a fast-paced reaction game where players need to click on numbered dots in ascending order (1, 2, 3...). Each dot disappears after 3 seconds of being clicked, and players must clear all dots to win.

## ✨ Features

- **Sequential Gameplay**: Click dots in numerical order (1→2→3→...)
- **Timer System**: Real-time elapsed time tracking with best time records
- **Auto Play Mode**: Watch the game play itself automatically
- **Confetti Effects**: Celebration animations when clicking correct dots and winning
- **Customizable Difficulty**: Adjust the number of dots (default: 5)
- **Game States**: Ready, Playing, Game Over, and All Cleared states
- **Visual Feedback**: Dots fade out over 3 seconds with countdown timers
- **Responsive Design**: Modern UI with Tailwind CSS styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game-clear-the-points
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Play

1. **Start Game**: Click the "Play" button to begin
2. **Click Dots**: Click on dots in numerical order (1, 2, 3, 4, 5...)
3. **Timer Challenge**: Each clicked dot disappears after 3 seconds
4. **Win Condition**: Clear all dots to win the game
5. **Lose Condition**: Click the wrong dot number to lose

### Controls

- **Play**: Start a new game
- **Restart**: Reset the current game
- **Auto Play ON/OFF**: Toggle automatic gameplay
- **Points Input**: Change the number of dots (1-50+)

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Canvas Confetti
- **Utilities**: Lodash
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/
│   └── GameBoard.tsx          # Main game board component
├── hooks/
│   ├── useAutoPlay.ts         # Auto-play functionality
│   ├── useConfetti.ts         # Confetti celebration effects
│   └── useTimer.ts            # Game timer management
├── pages/
│   └── HomePage.tsx           # Main game page
├── styles/
│   └── global.css             # Global styles and animations
├── types/
│   └── types.ts               # TypeScript type definitions
├── utils/
│   ├── constants.ts           # Game constants
│   └── generateDots.ts        # Dot generation logic
├── App.tsx                    # Root app component
└── main.tsx                   # App entry point
```

## 🎮 Game Mechanics

### Dot Generation
- Dots are randomly positioned on a 512x512 pixel board
- Minimum distance maintained between dots to prevent overlap
- Each dot has a unique sequential ID (1, 2, 3...)

### Timing System
- Real-time timer starts when game begins
- Best time tracking across sessions
- 3-second countdown for each clicked dot

### Auto Play Mode
- Automatically clicks the next correct dot every 1.5 seconds
- Can be toggled on/off during gameplay
- Useful for demonstration or testing

## 🎨 Styling Features

- **Dark Theme**: Modern dark UI with gradient accents
- **Animated Dots**: Hover effects and smooth transitions
- **Responsive Layout**: Centered game board with consistent spacing
- **Visual Feedback**: Color-coded game states and countdown timers

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Key Dependencies

- `react` & `react-dom` - Core React framework
- `canvas-confetti` - Celebration animations
- `lodash` - Utility functions
- `tailwindcss` - Styling framework
- `typescript` - Type safety

## 🎯 Game States

1. **READY**: Initial state, waiting for player to start
2. **PLAYING**: Active gameplay, timer running
3. **GAME_OVER**: Player clicked wrong dot
4. **ALL_CLEARED**: All dots successfully cleared