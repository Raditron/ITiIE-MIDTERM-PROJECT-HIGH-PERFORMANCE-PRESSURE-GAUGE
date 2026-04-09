# High-Performance Gauge Cluster - ITiIE Midterm Project

A sophisticated React-based dashboard simulating a high-performance industrial monitoring system with real-time interactive gauges.

## Features
- **Triple-Gauge Dashboard:** Real-time visualization of Pressure (PSI), Temperature (°C), and Carbon Monoxide (PPM).
- **Interactive Controls:** 
  - **Dynamic Cranking:** Pressure and CO gauges feature a "crank" mechanism that simulates physical resistance through deceleration logic as they approach maximum values.
  - **Granular Temp Console:** Precise increment/decrement controls for temperature management.
- **Safety Alerts:** 
  - **Visual Thresholds:** Gauges feature color-coded "danger zones" (Red for CO > 35 PPM and Pressure > 50 PSI; Blue for Temp < 18°C).
  - **Critical Failure Effect:** An interactive explosion sequence triggers when pressure reaches the absolute limit (60 PSI).

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Rendering:** HTML5 Canvas API
- **Styling:** CSS3 (Flexbox architecture)
- **Icons:** React Icons (Font Awesome 6)

## Component Architecture
- **`PressureGauge` / `TemperatureGauge` / `COGauge`**: High-fidelity canvas components utilizing custom mathematical projections for ticks, labels, and curved text.
- **`GaugeControlButton`**: A unified, reusable high-order component managing complex `setInterval` and `useRef` logic for smooth value accumulation and automatic decompression.
- **`TempControlConsole`**: A modular sub-system for granular state manipulation.
- **`drawCurvedText` Utility**: A specialized canvas helper for professional-grade circular typography.

## Defense & Engineering Highlights
- **Canvas API Rendering:** All gauges are procedurally drawn. This includes dynamic needle rotation, responsive notch coloring, and custom arc-based text rendering.
- **Advanced State Logic:** Implements sophisticated interval management to simulate realistic "momentum" and "drop-off" behaviors when controls are released.
- **DRY & SOLID Principles:** Recently refactored to abstract duplicate button logic into a single, highly-configurable pure component, significantly reducing technical debt.
- **Type Safety:** 100% TypeScript coverage for all props and state interfaces, ensuring a robust and scalable architecture.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
