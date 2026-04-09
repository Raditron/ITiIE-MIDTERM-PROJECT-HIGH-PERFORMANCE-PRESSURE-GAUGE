import { useRef, useEffect, useState } from "react";
import { gaugeColors } from "../utils/gaugeColors";
import { drawCurvedText } from "../utils/drawCurvedText";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import type { COGaugeProps } from "./interfaces/COGaugeProps";

const COGauge = ({ coPPM = 0 }: COGaugeProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const getNotchColor = (val: number) => {
    if (val >= 35) return gaugeColors.dangerRed;
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

    // Background and Outlines
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeGray;
    ctx.fill();

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
    const maxCO = 100;

    // Ticks and labels
    for (let co = 0; co <= maxCO; co += 10) {
      const angleDeg = startDeg + (co / maxCO) * sweepDeg;
      const angleRad = (angleDeg * Math.PI) / 180;

      const tickLength = 15;
      const xStart = centerX + (radius - tickLength) * Math.cos(angleRad);
      const yStart = centerY + (radius - tickLength) * Math.sin(angleRad);
      const xEnd = centerX + radius * Math.cos(angleRad);
      const yEnd = centerY + radius * Math.sin(angleRad);

      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = getNotchColor(co);
      ctx.lineWidth = 3;
      ctx.stroke();

      if (co % 20 === 0) {
        const textX = centerX + (radius - 30) * Math.cos(angleRad);
        const textY = centerY + (radius - 30) * Math.sin(angleRad);
        ctx.font = "16px Orbitron";
        ctx.fillStyle = getNotchColor(co);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(co.toString(), textX, textY);
      }

      if (co < maxCO) {
        for (let i = 2; i <= 8; i += 2) {
          const minorCO = co + i;
          const minorAngleDeg = startDeg + (minorCO / maxCO) * sweepDeg;
          const minorAngleRad = (minorAngleDeg * Math.PI) / 180;

          const minorTickLength = 10;
          const xStartMinor =
            centerX + (radius - minorTickLength) * Math.cos(minorAngleRad);
          const yStartMinor =
            centerY + (radius - minorTickLength) * Math.sin(minorAngleRad);
          const xEndMinor = centerX + radius * Math.cos(minorAngleRad);
          const yEndMinor = centerY + radius * Math.sin(minorAngleRad);

          ctx.beginPath();
          ctx.moveTo(xStartMinor, yStartMinor);
          ctx.lineTo(xEndMinor, yEndMinor);
          ctx.strokeStyle = getNotchColor(minorCO);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Needle
    const needleDeg = startDeg + (coPPM / maxCO) * sweepDeg;
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

    // Center UI
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeLigherGray;
    ctx.fill();

    ctx.font = "bold 20px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CO", centerX, centerY + 60);

    ctx.font = "bold 12px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PPM", centerX + 65, centerY + 40);

    drawCurvedText(
      ctx,
      "HIGH PERFORMANCE GAUGE",
      centerX,
      centerY,
      90,
      Math.PI / 2 + 7,
      9,
    );
  }, [coPPM, fontsLoaded]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default COGauge;
