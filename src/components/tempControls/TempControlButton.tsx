import type { TempControlButtonProps } from "../interfaces/TempControlButtonProps";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import "../styles/CrankButtonStyles.css";

export const TempControlButton = ({
  func,
  temperatureC,
  setTemperatureC,
}: TempControlButtonProps) => {
  const isRaise = func === "raise";

  return (
    <button
      className="crankButton"
      onClick={() => {
        if (isRaise) {
          if (temperatureC < 40) setTemperatureC((prev) => prev + 1);
        } else {
          if (temperatureC > 0) setTemperatureC((prev) => prev - 1);
        }
      }}
    >
      <label className="crankLabel">
        {isRaise ? <FaArrowUp /> : <FaArrowDown />}
      </label>
    </button>
  );
};

