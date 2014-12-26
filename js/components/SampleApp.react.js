var React = require('react');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');

function getCounterState() {
  return {
    counter: SampleStore.getSampleCounter()
  }
}

var SampleApp = React.createClass({
  getInitialState: function() {
    return { counter: 0 };
  },
  componentDidMount: function() {
    SampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SampleStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var counter = this.state.counter;
    return (
      <div>
        <p>{counter}</p>
        <a href="#" onClick={this._increment}>increment</a>&nbsp;
        <a href="#" onClick={this._decrement}>decrement</a>
      </div>
    );
  },
  _increment: function() {
    SampleActions.increment();
  },
  _decrement: function() {
    SampleActions.decrement();
  },
  _onChange: function() {
    this.setState(getCounterState());
  }
});

module.exports = SampleApp;
