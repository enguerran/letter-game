var React = require('react');
var TileContainer = require('./TileContainer.react');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');

var Rack = React.createClass({
  getInitialState: function() {
    return { letters: ["S","C","R","A","B","B","L"] };
  },
  componentDidMount: function() {
    SampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SampleStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var i = 0;
    var tileContainers = this.state.letters.map(function(letter) {
      return (<TileContainer tile={letter} key={"tile" + i++} />);
    })
    return (
      <div className="rack">
        {tileContainers}
      </div>
    );
  },
  _onChange: function() {
  }
});

module.exports = Rack;
