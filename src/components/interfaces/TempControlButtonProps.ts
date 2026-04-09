import type { Dispatch, SetStateAction } from "react";

export interface TempControlButtonProps {
  func: "raise" | "lower";
  temperatureC: number;
  setTemperatureC: Dispatch<SetStateAction<number>>;
}
