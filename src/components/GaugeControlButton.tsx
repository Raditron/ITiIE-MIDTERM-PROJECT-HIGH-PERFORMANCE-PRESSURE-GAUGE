import { useRef } from "react";
import type { GaugeControlButtonProps } from "./interfaces/GaugeControlButtonProps";
import "./styles/CrankButtonStyles.css";

export const GaugeControlButton = ({
  label,
  setValue,
  maxValue,
  slowDownStart = 30,
  baseIncrement = 2,
  incrementInterval = 50,
  dropInterval = 20,
}: GaugeControlButtonProps) => {
  const intervalRef = useRef<number | null>(null);
  const dropRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    if (dropRef.current) {
      clearInterval(dropRef.current);
      dropRef.current = null;
    }

    intervalRef.current = window.setInterval(() => {
      setValue((prev) => {
        let increment;
        if (prev < slowDownStart) {
          increment = baseIncrement;
        } else {
          const remaining = maxValue - prev;
          increment = Math.max(
            1,
            Math.floor(
              (remaining / (maxValue - slowDownStart)) * baseIncrement
            )
          );
        }

        const next = prev + increment;
        return next > maxValue ? maxValue : next;
      });
    }, incrementInterval);
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
      setValue((prev) => {
        if (prev <= 0) {
          if (dropRef.current) {
            clearInterval(dropRef.current);
            dropRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, dropInterval);
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
        <label className="crankLabel">{label}</label>
      </button>
    </div>
  );
};
