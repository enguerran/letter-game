var React = require('react');
var Tile = require('./Tile.react');
var CenterStar = require('./CenterStar.react');

var Board = React.createClass({
  render: function() {
    var tiles = [];
    for(var i = 0 ; i < this.props.x ; i++) {
      for(var j = 0 ; j < this.props.y ; j++) {
        tiles.push(<Tile key={i + "-" + j} x={i} y={j} boardSize={this.props.size} />);
      }
    }
    var width = this.props.size, height = this.props.size;
    var d = "M 0 0 h " + width + " v " + height + " H 0 V 0 z";
    var viewBox = "0 0 " + width + " " + height;
    return (
      <svg version="1.1" viewBox={viewBox} className="svg-board" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">
        <g>
          <g>
            <path fill="#19BE72" d={d} />
            {tiles}
            <CenterStar boardSize={this.props.size} />
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = Board;
