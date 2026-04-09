import type { Dispatch, SetStateAction } from "react";

export interface TempControlConsoleProps {
  temperatureC: number;
  setTemperatureC: Dispatch<SetStateAction<number>>;
}
