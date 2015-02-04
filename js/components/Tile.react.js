var React = require('react');

function getColor(x, y) {
  if(x % 4 === 1 && y % 4 === 1) {
    if(x !== 1 || y !== 1) {
      return "#0000FF";
    }
  }
  if(x%7 === 0 && y%7 === 0 && (x !== 7 || y !== 7)) {
      return "#FF0000";
  }
  if(x < 5 || x > 9 || x === 7) {
    if(x === y || x === 14 - y) {
      return "#FF80E5";
    }
  }
  if(x%14 !== 0) {
    if(!(x === 10 || x === 4) && x%2 === 0) {
      if(y === 14/2 + 1 || y === 14/2 - 1) {
        return "#00C0FF";
      }
    }
  }
  if(x%8 === 3) {
    if(y%7 === 0) {
      return "#00C0FF";
    }
  }
  if(y%14 !== 0) {
    if(!(y === 10 || y === 4) && y%2 === 0) {
      if(x === 14/2 + 1 || x === 14/2 - 1) {
        return "#00C0FF";
      }
    }
  }
  if(y%8 === 3) {
    if(x%7 === 0) {
      return "#00C0FF";
    }
  }
  return "none";
}

function getSVGCoordinates(x, y, boardSize, strokeWidth) {
  var size = ((boardSize - (strokeWidth * 15/16)) / 15);
  var coordx = x * size + strokeWidth/2;
  var coordy = y * size + strokeWidth/2;
  var d = "M " + coordy + " " + coordx + " h " + size + " v " + size + " h -" + size + " v -" + size + " Z";
  return d;
}

var Tile = React.createClass({
  render: function() {
    var strokeWidth = 5;
    var x = this.props.x, y = this.props.y;
    var d = getSVGCoordinates(x, y, this.props.boardSize, strokeWidth);
    var color = getColor(x,y);

    return <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />;
  }
});

module.exports = Tile;
