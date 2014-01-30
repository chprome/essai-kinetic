var data = require('./sample_data');

var stage = new Kinetic.Stage({
  container: 'container',
  width: 1600,
  height: 800
});

var layer = new Kinetic.Layer();

var x = 10,
  width = 100,
  height = 50,
  y = 10;

var rects = [];

data.nodes.forEach(function(node) {
  var rect = new Kinetic.Rect({
    x: x,
    y: y,
    width: width,
    height: height,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1
  });

  y+=height+10;

  layer.add(rect);

  rects.push(rect);
});

// add the layer to the stage
stage.add(layer);