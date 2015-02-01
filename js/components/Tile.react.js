var React = require('react');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');

var Tile = React.createClass({
  render: function() {
    return (<div className="tile">{this.props.letter}</div>);
  }
});

module.exports = Tile;
