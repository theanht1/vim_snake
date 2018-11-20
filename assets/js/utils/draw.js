
export const paintCell = (ctx, x, y, cw, color = '#e74c3c') => {
  // paint food cells
  ctx.fillStyle = color;
  ctx.fillRect(x * cw, y * cw, cw, cw);
  ctx.strokeStyle = color;
  ctx.strokeRect(x * cw, y * cw, cw , cw);
};
