const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300,
  units: 'mm', 
  encoding: 'image/jpeg'
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {

    let hue = Math.random()*360; 
    let hue2 = hue +180;

    const margin = 10;

    // Off-white background
    context.fillStyle = `hsl(10, 0%, 98%)`;
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    fill.addColorStop(1, `hsl(${hue2}, 100%, 60%)`);

    // Fill rectangle
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
  };
};

// Start the sketch
canvasSketch(sketch, settings);