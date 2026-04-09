import type { TempControlButtonProps } from "../interfaces/TempControlButtonProps"
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

    export const TempControlButton = ({ func }: TempControlButtonProps) => {
    return(
        <div>
            {func === 'raise' ? <FaArrowUp /> : <FaArrowDown />}
        </div>
    )
}