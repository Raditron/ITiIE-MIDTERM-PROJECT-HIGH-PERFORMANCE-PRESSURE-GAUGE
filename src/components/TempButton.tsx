import type { TempButtonProps } from "./interfaces/TempButtonProps";
import { useRef } from "react";
import "./styles/CrankButtonStyles.css";

export const TempButton = ({ setTemperatureC }: TempButtonProps) => {
  const intervalRef = useRef<number | null>(null);
  const dropRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    if (dropRef.current) {
      clearInterval(dropRef.current);
      dropRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setTemperatureC(prev => {
        const maxTemp = 40;
        const slowDownStart = 30;
        const baseIncrement = 2;

        let increment;
        if (prev < slowDownStart) {
          increment = baseIncrement;
        } else {
          const remaining = maxTemp - prev;
          increment = Math.max(
            1,
            Math.floor(
              (remaining / (maxTemp - slowDownStart)) * baseIncrement,
            ),
          );
        }

        const next = prev + increment;
        return next > maxTemp ? maxTemp : next;
      });
    }, 50);
  };

  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (dropRef.current) {
      clearInterval(dropRef.current);
    }

    dropRef.current = window.setInterval(() => {
      setTemperatureC(prev => {
        if (prev <= 0) {
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
        <label className="crankLabel">Temp</label>
      </button>
    </div>
  );
};
