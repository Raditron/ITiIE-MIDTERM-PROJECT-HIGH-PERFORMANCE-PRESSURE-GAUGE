import type { Dispatch, SetStateAction } from "react";

export interface TempButtonProps {
  temperatureC: number;
  setTemperatureC: Dispatch<SetStateAction<number>>;
}
