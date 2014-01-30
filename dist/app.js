(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var stage = new Kinetic.Stage({
  container: 'container',
  width: 578,
  height: 200
});

var layer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
  x: 239,
  y: 75,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 3
});

// add the shape to the layer
layer.add(rect);

// add the layer to the stage
stage.add(layer);
},{}]},{},[1])