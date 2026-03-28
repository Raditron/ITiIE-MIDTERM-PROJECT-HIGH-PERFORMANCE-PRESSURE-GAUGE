export function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  fontSize: number,
) {
  ctx.save();

  ctx.font = `${fontSize}px Orbitron`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.translate(centerX, centerY);
  ctx.rotate(startAngle);
 
  const angleStep = (5 * Math.PI) / 180; // Negative to go counter-clockwise (left to right at top/bottom)
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    ctx.save();
    ctx.rotate(angleStep * i);
    ctx.fillText(char, 0, -radius);
    ctx.restore();
  }

  ctx.restore();
}
