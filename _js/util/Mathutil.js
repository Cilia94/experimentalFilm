'use strict';

/*export const randomBetween = (start, end) =>
  start + Math.round(Math.random()*(end-start));

export const randomPoint = bounds => {

  bounds = bounds || {};
  bounds.border = bounds.border || 0;

  return {
    x: bounds.border + Math.round(Math.random() * (bounds.width-(bounds.border*2))),
    y: bounds.border + Math.round(Math.random() * (bounds.height-(bounds.border*2)))
  };

};*/

export const distanceBetweenPoints = (pos1, pos2) => {

  var xs = pos2.x - pos1.x;
  xs = xs * xs;

  var ys = pos2.y - pos1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);

};

export default {
  //randomBetween,
  distanceBetweenPoints,
  //randomPoint
};
