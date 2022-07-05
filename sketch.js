const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const colors = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.pick(colors);
  function createGrid() {
    const arr = [];
    const count = 40;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.3;
        arr.push({
          u,
          v,
          rotation: random.noise2D(u, v),
          color: random.pick(palette),
          radius,
        });
      }
    }

    return arr;
  }

  const grid = createGrid();

  return ({ context: ctx, width, height }) => {
    const margin = 300;

    ctx.fillStyle = random.pick(random.pick(colors));
    ctx.fillRect(0, 0, width, height);
    grid.forEach(({ u, v, radius, rotation, color }) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      ctx.save();
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.font = `${radius * width}px "Arial"`;
      // change the char below to visualize other results
      ctx.fillText("-", 0, 0);
      ctx.restore();
    });
  };
};

canvasSketch(sketch, settings);
