"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var Constants = require("../constants/Constants");
var assign = require("object-assign");

var CHANGE_EVENT = "change";

var activeLetter;

var SampleStore = assign({}, EventEmitter.prototype, {
  getActiveLetter: function() {
    return activeLetter;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case Constants.ACTIVE_LETTER:
      activeLetter = action.letter;
      break;
    default:
      return true;
  }
  console.log("STORE", SampleStore.getActiveLetter());
  SampleStore.emitChange();
  return true;
});

module.exports = SampleStore;
