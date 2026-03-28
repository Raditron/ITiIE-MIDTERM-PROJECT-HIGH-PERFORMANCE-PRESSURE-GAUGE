# Pressure Gauge - Uni Project

A simple React application that simulates a high-performance pressure gauge with interactive controls.

## Features
- **Interactive Gauge:** Real-time visualization of pressure levels.
- **Crank Control:** Use the crank button to increase/decrease pressure.
- **Critical Alert:** Visual feedback (explosion effect) when pressure reaches a critical threshold (60 PSI).

## Tech Stack
- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS

## How to Run
1. Navigate to the `Measuring` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Defense Points
- **HTML5 Canvas Rendering:** The gauge is dynamically drawn using the Canvas API, including custom text curvature and real-time needle rotation.
- **Interval-Based Logic:** Implements `setInterval` and `useRef` to handle smooth pressure accumulation and automatic decompression when the crank is released.
- **State Management:** Uses React's `useState` and `useEffect` for synchronized UI updates and event triggers (e.g., the critical pressure animation).
- **Component Architecture:** Divided into modular components (`PressureGauge`, `CrankButton`) and utility functions (`drawCurvedText`) for professional code organization.
- **TypeScript Integration:** Ensures robust type safety for props and state, reducing runtime errors.
