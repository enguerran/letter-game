var React = require('react');

var WT = [[0,0],[0,7],[0,15]];

var Tile = React.createClass({
  render: function() {
    var strokeWidth = 5;
    var x = this.props.x, y = this.props.y;
    var size = ((this.props.boardSize - (strokeWidth * 15/16)) / 15);
    var coordx = x * size + strokeWidth/2;
    var coordy = y * size + strokeWidth/2;
    var d = "M " + coordy + " " + coordx + " h " + size + " v " + size + " h -" + size + " v -" + size + " Z";

    var color = "none";
    if(x % 4 === 1 && y % 4 === 1) {
      color = "#000000";
    }
    if(x%7 === 0 && y%7 === 0) {
      color = "#FF0000";
    }
    else if(x < 5 || x > 9) {
      if(x === y || x === 14 - y) {
        color = "#FF80E5";
      }
    }

    return <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
  }
});

module.exports = Tile;
