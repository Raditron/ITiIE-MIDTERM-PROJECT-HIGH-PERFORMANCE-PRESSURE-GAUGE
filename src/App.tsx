import { useEffect, useState } from "react";
import "./App.css";
import { CrankButton } from "./components/CrankButton";
import { TempButton } from "./components/TempButton";
import PressureGauge from "./components/PressureGauge";
import TemperatureGauge from "./components/TemperatureGauge";
import explosion from "./assets/explosion.gif";
function App() {
  const [pressurePSI, setPressurePSI] = useState<number>(0);
  const [temperatureC, setTemperatureC] = useState<number>(0);
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
          <div className="gaugesContainer">
          <div>
            <TemperatureGauge temperatureC={temperatureC} />
          </div>
          <div>
            <PressureGauge pressurePSI={pressurePSI} />
          </div>
          <div>
            <PressureGauge pressurePSI={pressurePSI} />
          </div>
          </div>
          <label className="pressureLabel">
            Current Pressure: {pressurePSI} PSI | Temp: {temperatureC} °C
          </label>
        </div>
        <div className="crankButtonContainer" style={{ display: 'flex', gap: '20px' }}>
          <TempButton
            temperatureC={temperatureC}
            setTemperatureC={setTemperatureC}
          />
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
