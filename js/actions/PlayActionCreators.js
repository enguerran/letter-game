"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var Constants = require("../constants/Constants");

var PlayActionCreators = {
  playLetter: function(letter) {
    AppDispatcher.handleViewAction({
      actionType: Constants.ACTIVE_LETTER,
      letter: letter
    });
  },
  decrement: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_DECR
    });
  }
};

module.exports = PlayActionCreators;
