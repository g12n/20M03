const canvasSketch = require('canvas-sketch');
const distance =  require('gl-vec2/distance');
// Sketch parameters
const settings = {
  // 3.5x2 inches
  dimensions: [ 400, 600 ],
  pixelsPerInch: 300,
  units: 'mm', 
  encoding: 'image/jpeg', 
  bleed: 3
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    let hue = Math.random()*360; 
    let hue2 = hue +180;
    let center = [Math.random()*width, Math.random()*height]
    let pointCount =parseInt(Math.random()*2000) + 120 ;
    let padding = 60;

    let boundsWidth = width-2*padding;
    let boundsHeight = height-2*padding;

    let maxRadius=  Math.max( distance([0,0],center), distance([width,0],center), distance([width,height],center), distance([0,height],center))
    
    context.fillStyle = `hsl(${hue}, 100%, 1%)`;
    context.fillRect(0,0,width,height)

    context.rect(padding,padding,boundsWidth,boundsHeight)
    
    context.strokeStyle = `hsl(${hue2}, 40%, 60%)`;context.fillStyle = `hsl(${hue2}, 40%, 60%)`;
    context.lineWidth = 2;
    context.beginPath
    context.rect(padding,padding,boundsWidth,boundsHeight)
    context.stroke();

    context.clip();

    
    let drawCirlce = (point = center, radius = 5) => {
      let [x,y] = point;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    }

    for (let i = 1; i <= pointCount; i++){
  
      // Here phi is the golden ratio
      const phi = (Math.sqrt(5) + 1) / 2;
      // Pick our angle based on the golden ratio
      const theta = 2 * Math.PI * i * phi;
      const t = i / pointCount;
      const distance = Math.sqrt(t);
      const r = distance * maxRadius;
      let angle = i * Math.PI * 0.1;
      
      let x = r * Math.sin(theta) + center[0]
      let y = r * Math.cos(theta) + center[1]
   
      // Now draw a circle at each point
      // Make them smaller when closer to centre
      
      const radius = 10* Math.pow(t, 0.5);

      if(i%2 != 0){
        context.fillStyle = `hsl(${hue}, 40%, 60%)`;
      } else{
        context.fillStyle = `hsl(${hue2}, 40%, 60%)`;
      }
      drawCirlce([x,y], radius)


    }
 
    

 
    

  };
};

// Start the sketch
canvasSketch(sketch, settings);