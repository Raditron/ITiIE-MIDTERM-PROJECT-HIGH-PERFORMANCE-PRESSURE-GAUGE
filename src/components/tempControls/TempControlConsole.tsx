import type { TempControlConsoleProps } from "../interfaces/TempControlConsoleProps";
import { TempControlButton } from "./TempControlButton";
import "../styles/TempControlConsole.css";

export const TempControlConsole = ({
  temperatureC,
  setTemperatureC,
}: TempControlConsoleProps) => {
  return (
    <div id="TempControlConsole">
      <TempControlButton
        func="raise"
        temperatureC={temperatureC}
        setTemperatureC={setTemperatureC}
      />
      <TempControlButton
        func="lower"
        temperatureC={temperatureC}
        setTemperatureC={setTemperatureC}
      />
    </div>
  );
};
