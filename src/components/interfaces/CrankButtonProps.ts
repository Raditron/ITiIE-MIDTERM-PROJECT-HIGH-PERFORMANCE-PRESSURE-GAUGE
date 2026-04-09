import type { Dispatch, SetStateAction } from "react";

export interface CrankButtonProps {
    pressurePSI: number
    setPressurePSI: Dispatch<SetStateAction<number>>;
}
