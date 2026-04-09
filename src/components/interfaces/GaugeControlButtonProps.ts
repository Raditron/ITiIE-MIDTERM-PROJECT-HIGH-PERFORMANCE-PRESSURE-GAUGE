import type { Dispatch, SetStateAction } from "react";

export interface GaugeControlButtonProps {
  label: string;
  setValue: Dispatch<SetStateAction<number>>;
  maxValue: number;
  slowDownStart?: number;
  baseIncrement?: number;
  incrementInterval?: number;
  dropInterval?: number;
}
