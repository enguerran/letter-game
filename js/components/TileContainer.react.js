var React = require('react');
var EmptyTile = require('./EmptyTile.react');
var Tile = require('./Tile.react');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');

var TileContainer = React.createClass({
  render: function() {
    var tile = {};
    if(this.props.tile === "0") {
      tile = <EmptyTile />;
    }
    else {
      tile = <Tile letter={this.props.tile} />
    }
    return (
      <div className="tileContainer">
        {tile}
      </div>);
  }
});

module.exports = TileContainer;
