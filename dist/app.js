(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./sample_data":2}],2:[function(require,module,exports){
module.exports = {
    nodes: [
        {id: 0, name: 'société A'},
        {id: 1, name: 'société B'},
        {id: 2, name: 'société C'},
        {id: 3, name: 'société D'},
        {id: 4, name: 'société E'},
        {id: 5, name: 'société F'},
        {id: 6, name: 'société G'},
        {id: 6, name: 'société H'},
        {id: 7, name: 'société I'},
        {id: 8, name: 'société J'},
        {id: 9, name: 'société K'},
        {id: 10, name: 'société L'},
        {id: 11, name: 'société M'},
        {id: 12, name: 'société N'},
        {id: 13, name: 'société O'},
        {id: 14, name: 'société P'},
        {id: 15, name: 'société Q'},
        {id: 16, name: 'société R'},
        {id: 17, name: 'société S'},
        {id: 18, name: 'société T'},
        {id: 19, name: 'société U'},
        {id: 20, name: 'société V'},
        {id: 21, name: 'société W'},
        {id: 22, name: 'société X'},
        {id: 23, name: 'société Y'},
        {id: 24, name: 'société Z'},
    ],

    links: [
        {src: 1, dst: 2, label: '10%'},
        {src: 2, dst: 3, label: '10%'},
        {src: 2, dst: 4, label: '10%'},
        {src: 2, dst: 6, label: '10%'},
        {src: 3, dst: 5, label: '10%'},
        {src: 4, dst: 7, label: '10%'},
        {src: 6, dst: 8, label: '10%'},
        {src: 7, dst: 9, label: '10%'},
        {src: 9, dst: 10, label: '10%'},
    ]
};
},{}]},{},[1])