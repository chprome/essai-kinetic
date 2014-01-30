// var data = require('./sample_data'),
var data = require('./sample_data_2000nodes_1500links'),
  _ = require('lodash');

var stage = new Kinetic.Stage({
  container: 'container',
  width: 1600,
  height: 800
});

var mainLayer = new Kinetic.Layer();

mainLayer.setDraggable("draggable");

//a large transparent background to make everything draggable
var background = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 1600,
    height: 800,
    fill: "red",
    opacity: 0
});

mainLayer.add(background);

var margin = 60,
  x = margin,
  width = 250,
  height = 80,
  y = margin;

var rects = [];

data.nodes.forEach(function(node) {
  var rect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    stroke: '#00739e',
    strokeWidth: 3
  });

  if(y + height + margin  >= 700) {
    y = margin;
    x += width+margin;
  } else {
    y+=height+margin;
  }

  var text = new Kinetic.Text({
    x: width/2,
    y: height/2,
    text: node.name,
    fontSize: '12',
    fontFamily: 'Arial',
    fill: '#00739E'
  });

  text.setOffsetX(text.width()/2);
  text.setOffsetY(text.height()/2);

  var group = new Kinetic.Group({
    x: x,
    y: y,
    draggable: true
  });

  group.add(rect);
  group.add(text);

  mainLayer.add(group);

  rects.push(group);

  group.setAttr('nodeId', node.id);

  group.on('dragmove', function() {
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

  mainLayer.add(line);

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

  mainLayer.add(text);

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

  mainLayer.draw();
};

var zoom = function(e) {
  var zoomAmount = e.wheelDeltaY*0.001;
  mainLayer.setScaleX(mainLayer.getScale().x+zoomAmount);
  mainLayer.setScaleY(mainLayer.getScale().x+zoomAmount);
  mainLayer.draw();
};

document.addEventListener("mousewheel", zoom, false);

// add the layer to the stage
stage.add(mainLayer);
