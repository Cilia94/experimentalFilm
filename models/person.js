'use strict';

let Status = require('../models/Status');

module.exports = {
  status: Status.on_seat,
  type: 1,
  happy: false
};
