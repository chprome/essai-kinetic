var data = require('./sample_data'),
  _ = require('lodash');

var stage = new Kinetic.Stage({
  container: 'container',
  width: 1600,
  height: 800
});

var rectsLayer = new Kinetic.Layer(),
  linesLayer = new Kinetic.Layer();

var x = 10,
  width = 100,
  height = 50,
  y = 10;

var rects = {};

data.nodes.forEach(function(node) {
  var rect = new Kinetic.Rect({
    x: x,
    y: y,
    width: width,
    height: height,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true
  });

  y+=height+10;

  rectsLayer.add(rect);

  rects[node.id] = rect;
});


var lines = {};

data.links.forEach(function (link) {

  var srcPoint = rects[link.src].getPosition(),
    dstPoint =  rects[link.dst].getPosition();

  var line = new Kinetic.Line({
    points: [srcPoint.x, srcPoint.y, dstPoint.x, dstPoint.y],
    stroke: 'red',
    strokeWidth: 1
  });

  linesLayer.add(line);

  if(!lines.hasOwnProperty(link.src)) {
      lines[link.src] = {};
  }

  lines[link.src][link.dst] = line;

});

function updateLines() {

  for(var linkSrc in lines) {
    for(var linkDst in lines[linkSrc]) {
      var srcPoint = rects[linkSrc].getPosition(),
        dstPoint =  rects[linkDst].getPosition();
        lines[linkSrc][linkDst].setPoints(srcPoint.x, srcPoint.y, dstPoint.x, dstPoint.y);
        console.log('new position',srcPoint.x, srcPoint.y, dstPoint.x, dstPoint.y);
    }
  }

}


// add the layer to the stage
stage.add(rectsLayer);
stage.add(linesLayer);

rectsLayer.on('beforeDraw', function() {
  updateLines();
}.bind(this));