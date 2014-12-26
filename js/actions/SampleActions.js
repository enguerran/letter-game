var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var SampleActions = {
  increment: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_INCR
    });
  },
  decrement: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_DECR
    });
  }
}

module.exports = SampleActions;
