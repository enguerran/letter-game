var React = require('react');
var interact = require('interact.js');

function getSVGCoordinates(x, y, boardSize, strokeWidth) {
  var size = ((boardSize - (strokeWidth * 15/16)) / 15);
  var coordx = x * size + strokeWidth/2 + 2;
  var coordy = y * size + strokeWidth/2 + 2;
  size -= 4;
  var d = "M " + coordx + " " + coordy + " h " + size + " v " + size + " h -" + size + " v -" + size + " Z";
  return d;
}

function getTextPosition(x, y, boardSize, strokeWidth) {
    var size = ((boardSize - (strokeWidth * 15/16)) / 15);
    var coordx = x * size + strokeWidth/2 + 2;
    var coordy = y * size + strokeWidth/2 + 2;

    return {coordx: coordx + 12, coordy: coordy + 45};
}

var style = {
  fill: "#999999",
  stroke: "#000000",
  fontSize: "48px"
};

var LetterTile = React.createClass({
  render: function() {
    var strokeWidth = 5;
    var x = this.props.x, y = this.props.y;
    var d = getSVGCoordinates(x, y, this.props.boardSize, strokeWidth);

    var textPos = getTextPosition(x, y, this.props.boardSize, strokeWidth);

    return (
      <g className="draggable">
        <path data-type="letter" fill="#D4C462" d={d}/>
        <text x={textPos.coordx} y={textPos.coordy} style={style}>{this.props.letter}</text>
      </g>
      );
  }
});

module.exports = LetterTile;
