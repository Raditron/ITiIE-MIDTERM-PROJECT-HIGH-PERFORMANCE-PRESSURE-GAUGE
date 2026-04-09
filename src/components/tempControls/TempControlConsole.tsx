import { TempControlButton } from "./TempControlButton";

export const TempControlConsole = () => {
  return (
    <div id="TempControlConsole">
      <TempControlButton func="raise" />
      <TempControlButton func="lower" />
    </div>
  );
};
