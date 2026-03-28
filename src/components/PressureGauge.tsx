import { useRef, useEffect, useState } from "react";
import { gaugeColors } from "../utils/gaugeColors";
import { drawCurvedText } from "../utils/drawCurvedText";
import "@fontsource/orbitron/400.css"; // regular
import "@fontsource/orbitron/700.css"; // bold

const PressureGaugeCanvas = ({ pressurePSI = 0 }: { pressurePSI?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Ensure the font is loaded before drawing
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    // draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeGray;
    ctx.fill();

    // first stroke (original)
    ctx.strokeStyle = gaugeColors.gaugeGray;
    ctx.lineWidth = 5;
    ctx.stroke();

    // second stroke (outer outline)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeLigherGray; //
    ctx.lineWidth = 12;
    ctx.stroke();

    // third stroke
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeWhite; //
    ctx.lineWidth = 8;
    ctx.stroke();

    // fourth stroke
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 30, 0, 2 * Math.PI);
    ctx.strokeStyle = gaugeColors.gaugeBlack;
    ctx.lineWidth = 8;
    ctx.stroke();

    // gauge parameters
    const startDeg = -200; // left end of gauge
    const endDeg = 20; // right end of gauge
    const sweepDeg = endDeg - startDeg;

    // draw ticks and labels
    for (let psi = 0; psi <= 60; psi += 5) {
      const angleDeg = startDeg + (psi / 60) * sweepDeg;
      const angleRad = (angleDeg * Math.PI) / 180;

      const tickLength = 15;
      const lineWidth = 3;

      // start and end points of tick
      const xStart = centerX + (radius - tickLength) * Math.cos(angleRad);
      const yStart = centerY + (radius - tickLength) * Math.sin(angleRad);
      const xEnd = centerX + radius * Math.cos(angleRad);
      const yEnd = centerY + radius * Math.sin(angleRad);

      // draw tick
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle =
        psi >= 50 ? gaugeColors.dangerRed : gaugeColors.gaugeWhite;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // draw text for every 10 PSI
      if (psi % 10 === 0) {
        const textX = centerX + (radius - 30) * Math.cos(angleRad);
        const textY = centerY + (radius - 30) * Math.sin(angleRad);
        ctx.font = "16px Orbitron";
        ctx.fillStyle =
          psi >= 50 ? gaugeColors.dangerRed : gaugeColors.gaugeWhite;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(psi.toString(), textX, textY);
      }

      // draw 4 small minor ticks between 5 PSI increments
      if (psi < 60) {
        for (let i = 1; i <= 4; i++) {
          const minorPsi = psi + i * 1; // 1 PSI increments
          const minorAngleDeg = startDeg + (minorPsi / 60) * sweepDeg;
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
          ctx.strokeStyle =
            psi >= 50 ? gaugeColors.dangerRed : gaugeColors.gaugeWhite;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // draw needle
    const needleDeg = startDeg + (pressurePSI / 60) * sweepDeg;
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

    // draw needle center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = gaugeColors.gaugeLigherGray;
    ctx.fill();

    // draw BOOST text above center
    ctx.font = "bold 20px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BOOST", centerX, centerY + 60);

    // draw PSI text
    ctx.font = "bold 12px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PSI", centerX + 65, centerY + 40);

    ctx.font = "16px Orbitron";
    ctx.fillStyle = gaugeColors.gaugeWhite;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    drawCurvedText(
      ctx,
      "HIGH PERFORMANCE GAUGE",
      centerX,
      centerY,
      90,
      Math.PI / 2 + 7, //magic number but if it aint broke lol
      9,
    );
  }, [pressurePSI, fontsLoaded]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default PressureGaugeCanvas;
