import { useEffect, useState } from "react";
import "./App.css";
import { CrankButton } from "./components/CrankButton";
import PressureGauge from "./components/PressureGauge";
import explosion from "./assets/explosion.gif";
function App() {
  const [pressurePSI, setPressurePSI] = useState<number>(0);
  const [showExplosion, setShowExplosion] = useState<boolean>(false);
  
  useEffect(() => {
    if (pressurePSI === 60) {
      const showTimeout = setTimeout(() => {
        setShowExplosion(true);

        const hideTimeout = setTimeout(() => {
          setShowExplosion(false);
        }, 1800);
        return () => clearTimeout(hideTimeout);
      }, 0);

      return () => clearTimeout(showTimeout);
    }
  }, [pressurePSI]);
  
  return (
    <>
      <h1 className="heading">HIGH PERFORMANCE PRESSURE GAUGE</h1>
      <h2 className="subheading">RADOSLAV PETROV RUSEV</h2>
      <div className="pageWrapper">
        <div id={"measuringGaugeContainer"}>
          <div>
            <PressureGauge pressurePSI={pressurePSI} />
          </div>
          <label className="pressureLabel">
            Current Pressure: {pressurePSI} PSI
          </label>
        </div>
        <div className="crankButtonContainer">
          <CrankButton
            pressurePSI={pressurePSI}
            setPressurePSI={setPressurePSI}
          />
        </div>
      </div>
      {showExplosion && (
        <img
          src={explosion}
          alt={"funny-gif"}
          width={1000}
          height={1000}
          className="explosion"
        />
      )}
    </>
  );
}

export default App;
