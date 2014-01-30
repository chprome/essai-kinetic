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

var rects = [];

data.nodes.forEach(function(node) {
  var rect = new Kinetic.Rect({
    x: x,
    y: y,
    width: width,
    height: height,
    stroke: '#00739e',
    strokeWidth: 3,
    draggable: true
  });

  y+=height+10;

  rectsLayer.add(rect);

  rects.push(rect);

  rect.setAttr('nodeId', node.id);

  rect.on('dragmove', function() {
    updateLines(this);
  });
});


var srcRects = {},
    dstRects = {};

data.links.forEach(function (link) {

  var srcRect = _.find(rects, function(rect) { return rect.getAttr('nodeId') === link.src; }),
    dstRect = _.find(rects, function(rect) { return rect.getAttr('nodeId') === link.dst; });

  var line = new Kinetic.Line({
    points: [srcRect.getPosition().x, srcRect.getPosition().y, dstRect.getPosition().x, dstRect.getPosition().y],
    stroke: '#e25d40',
    strokeWidth: 2
  });

  linesLayer.add(line);

  srcRects[link.src] = srcRects[link.src] || [];
  srcRects[link.src].push(line);
  dstRects[link.dst] = dstRects[link.dst] || [];
  dstRects[link.dst].push(line);

}.bind(this));

var updateLines = function updateLines(rect) {

  if(srcRects[rect.getAttr('nodeId')]) {  
    srcRects[rect.getAttr('nodeId')].forEach(function(line) {
      var currentPoints = line.getPoints();
      currentPoints[0] = rect.getPosition().x;
      currentPoints[1] = rect.getPosition().y;
      line.setPoints(currentPoints);
    });
  }

  if(dstRects[rect.getAttr('nodeId')]) {
    dstRects[rect.getAttr('nodeId')].forEach(function(line) {
      var currentPoints = line.getPoints();
      currentPoints[2] = rect.getPosition().x;
      currentPoints[3] = rect.getPosition().y;
      line.setPoints(currentPoints);
    });
  }

  linesLayer.draw();
};

  debugger

// add the layer to the stage
stage.add(rectsLayer);
stage.add(linesLayer);