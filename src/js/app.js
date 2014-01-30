var data = require('./sample_data'),
  _ = require('lodash');

var stage = new Kinetic.Stage({
  container: 'container',
  width: 1600,
  height: 800
});

var rectsLayer = new Kinetic.Layer(),
  linesLayer = new Kinetic.Layer();

var margin = 60,
  x = margin,
  width = 250,
  height = 80,
  y = margin;

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

  if(y + height + margin  >= 700) {
    y = margin;
    x += width+margin;
  } else {
    y+=height+margin;
  }

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
    dstRect = _.find(rects, function(rect) { return rect.getAttr('nodeId') === link.dst; }),
    srcPos = srcRect.getPosition(),
    dstPos = dstRect.getPosition();

  var line = new Kinetic.Line({
    points: [srcPos.x, srcPos.y, dstPos.x + width, dstPos.y + height],
    stroke: '#e25d40',
    strokeWidth: 2
  });

  linesLayer.add(line);

  var textX = line.getPoints()[0] + (line.getPoints()[2]-line.getPoints()[0])/2,
    textY = line.getPoints()[1] + (line.getPoints()[3]-line.getPoints()[1])/2;

  var text = new Kinetic.Text({
    x: textX,
    y: textY,
    text: link.label,
    fontSize: '12',
    fontFamily: 'Arial',
    fill: '#333'
  });

  line.setAttr('text', text);

  linesLayer.add(text);

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
      var textX = currentPoints[0] + (currentPoints[2]-currentPoints[0])/2,
      textY = currentPoints[1] + (currentPoints[3]-currentPoints[1])/2;
      line.getAttr('text').setPosition({x: textX, y: textY});
    });
  }

  if(dstRects[rect.getAttr('nodeId')]) {
    dstRects[rect.getAttr('nodeId')].forEach(function(line) {
      var currentPoints = line.getPoints();
      currentPoints[2] = rect.getPosition().x+width;
      currentPoints[3] = rect.getPosition().y+height;
      line.setPoints(currentPoints);
      var textX = currentPoints[0] + (currentPoints[2]-currentPoints[0])/2,
      textY = currentPoints[1] + (currentPoints[3]-currentPoints[1])/2;
      line.getAttr('text').setPosition({x: textX, y: textY});
    });
  }

  linesLayer.draw();
};


// add the layer to the stage
stage.add(rectsLayer);
stage.add(linesLayer);