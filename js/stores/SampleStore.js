var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _counter = 0;

var SampleStore = Object.assign({}, EventEmitter.prototype, {
  getSampleCounter: function() {
    return _counter;
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
    case Constants.SAMPLE_INCR:
      _counter += 1;
      break;
    case Constants.SAMPLE_DECR:
      _counter -= 1;
      break;
    default:
      return true;
  }
  SampleStore.emitChange();
  return true;
});

module.exports = SampleStore;
