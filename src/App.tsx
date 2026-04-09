import { useEffect, useState } from "react";
import "./App.css";
import { GaugeControlButton } from "./components/GaugeControlButton";
import PressureGauge from "./components/PressureGauge";
import TemperatureGauge from "./components/TemperatureGauge";
import COGauge from "./components/COGauge";
import explosion from "./assets/explosion.gif";
import { TempControlConsole } from "./components/tempControls/TempControlConsole";
function App() {
  const [pressurePSI, setPressurePSI] = useState<number>(0);
  const [temperatureC, setTemperatureC] = useState<number>(0);
  const [coPPM, setCoPPM] = useState<number>(0);
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
            <div className="gaugeGroup">
              <TemperatureGauge temperatureC={temperatureC} />
              <TempControlConsole
                temperatureC={temperatureC}
                setTemperatureC={setTemperatureC}
              />
            </div>
            <div className="gaugeGroup">
              <PressureGauge pressurePSI={pressurePSI} />
              <GaugeControlButton
                label="Crank"
                setValue={setPressurePSI}
                maxValue={60}
                slowDownStart={30}
              />
            </div>
            <div className="gaugeGroup">
              <COGauge coPPM={coPPM} />
              <GaugeControlButton
                label="CO"
                setValue={setCoPPM}
                maxValue={100}
                slowDownStart={80}
              />
            </div>
          </div>
          <div className="statusLabelContainer">
            <label className="pressureLabel">
              Pressure: {pressurePSI} PSI | Temp: {temperatureC} °C | CO:
              {coPPM} PPM
            </label>
          </div>
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
