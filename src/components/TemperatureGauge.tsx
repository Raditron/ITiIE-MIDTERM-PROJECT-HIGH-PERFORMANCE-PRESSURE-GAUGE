import { useRef, useEffect, useState } from "react";
import { gaugeColors } from "../utils/gaugeColors";
import { drawCurvedText } from "../utils/drawCurvedText";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import type { TemperatureGaugeProps } from "./interfaces/TemperatureGaugeProps";

const TemperatureGauge = ({ temperatureC = 0 }: TemperatureGaugeProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const getNotchColor = (val: number) => {
    if (val < 18) return gaugeColors.coldBlue;
    if (val > 26) return gaugeColors.dangerRed;
    return gaugeColors.gaugeWhite;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    // Background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeGray;
    ctx.fill();

    // Outlines
    ctx.strokeStyle = gaugeColors.gaugeGray;
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeLigherGray;
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeWhite;
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 30, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeBlack;
    ctx.lineWidth = 8;
    ctx.stroke();

    const startDeg = -200;
    const endDeg = 20;
    const sweepDeg = endDeg - startDeg;
    const maxTemp = 40;

    // Ticks and labels
    for (let temp = 0; temp <= maxTemp; temp += 5) {
      const angleDeg = startDeg + (temp / maxTemp) * sweepDeg;
      const angleRad = (angleDeg * Math.PI) / 180;

      const tickLength = 15;
      const xStart = centerX + (radius - tickLength) * Math.cos(angleRad);
      const yStart = centerY + (radius - tickLength) * Math.sin(angleRad);
      const xEnd = centerX + radius * Math.cos(angleRad);
      const yEnd = centerY + radius * Math.sin(angleRad);

      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = getNotchColor(temp);
      ctx.lineWidth = 3;
      ctx.stroke();

      if (temp % 10 === 0) {
        const textX = centerX + (radius - 30) * Math.cos(angleRad);
        const textY = centerY + (radius - 30) * Math.sin(angleRad);
        ctx.font = "16px Orbitron";
        ctx.fillStyle = getNotchColor(temp);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(temp.toString(), textX, textY);
      }

      if (temp < maxTemp) {
        for (let i = 1; i <= 4; i++) {
          const minorTemp = temp + i * 1;
          const minorAngleDeg = startDeg + (minorTemp / maxTemp) * sweepDeg;
          const minorAngleRad = (minorAngleDeg * Math.PI) / 180;

          const minorTickLength = 10;
          const xStartMinor = centerX + (radius - minorTickLength) * Math.cos(minorAngleRad);
          const yStartMinor = centerY + (radius - minorTickLength) * Math.sin(minorAngleRad);
          const xEndMinor = centerX + radius * Math.cos(minorAngleRad);
          const yEndMinor = centerY + radius * Math.sin(minorAngleRad);

          ctx.beginPath();
          ctx.moveTo(xStartMinor, yStartMinor);
          ctx.lineTo(xEndMinor, yEndMinor);
          ctx.strokeStyle = getNotchColor(minorTemp);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Needle
    const needleDeg = startDeg + (temperatureC / maxTemp) * sweepDeg;
    const needleRad = (needleDeg * Math.PI) / 180;
    const needleLength = radius - 5;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleRad),
      centerY + needleLength * Math.sin(needleRad),
    );
    ctx.strokeStyle = gaugeColors.gaugeWhite;
    ctx.lineWidth = 5;
    ctx.stroke();

    // Center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeLigherGray;
    ctx.fill();

    ctx.font = "bold 20px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TEMP", centerX, centerY + 60);

    ctx.font = "bold 12px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("°C", centerX + 65, centerY + 40);

    drawCurvedText(
      ctx,
      "HIGH PERFORMANCE GAUGE",
      centerX,
      centerY,
      90,
      Math.PI / 2 + 7,
      9,
    );
  }, [temperatureC, fontsLoaded]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default TemperatureGauge;
