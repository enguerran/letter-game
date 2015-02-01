var React = require('react');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');

var EmptyTile = React.createClass({
  render: function() {
    return (<div className="tile emptyTile"></div>);
  }
});

module.exports = EmptyTile;
