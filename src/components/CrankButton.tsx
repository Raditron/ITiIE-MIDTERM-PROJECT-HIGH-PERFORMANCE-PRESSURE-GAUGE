import type { CrankButtonProps } from "./interfaces/CrankButtonProps";
import { useRef } from "react";
import "./styles/CrankButtonStyles.css";
export const CrankButton = ({ setPressurePSI }: CrankButtonProps) => {
  const intervalRef = useRef<number | null>(null);
  const dropRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    if (dropRef.current) {
      clearInterval(dropRef.current);
      dropRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setPressurePSI(prev => {
        const maxPressure = 60;
        const slowDownStart = 30;
        const baseIncrement = 2;

        let increment;
        if (prev < slowDownStart) {
          increment = baseIncrement;
        } else {
          const remaining = maxPressure - prev;
          increment = Math.max(
            1,
            Math.floor(
              (remaining / (maxPressure - slowDownStart)) * baseIncrement,
            ),
          );
        }

        const next = prev + increment;
        return next > maxPressure ? maxPressure : next;
      });
    }, 50);
  };

  const handleMouseUp = () => {
  // stop crank interval
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  // stop any existing drop interval first
  if (dropRef.current) {
    clearInterval(dropRef.current);
  }

  dropRef.current = window.setInterval(() => {
    setPressurePSI(prev => {
      if (prev <= 0) {
        // clear drop interval here safely
        if (dropRef.current) {
          clearInterval(dropRef.current);
          dropRef.current = null;
        }
        return 0;
      }
      return prev - 1;
    });
  }, 20);
};

  return (
    <div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="crankButton"
      >
        <label className="crankLabel">Crank</label>
      </button>
    </div>
  );
};
