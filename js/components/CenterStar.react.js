var React = require('react');

var CenterStar = React.createClass({
  render: function() {
    var tileSize = this.props.boardSize / 15;

    var a1 = 7 * tileSize + 10;
    var a2 = 7 * tileSize + 20;
    var a3 = 7 * tileSize + 50;
    var a4 = 7 * tileSize + 30;
    var points1 = a1 + "," + a2 + " " + a3 + "," + a2 + " " + a4 + "," + a3;
    var b1 = 7 * tileSize + 10;
    var b2 = 7 * tileSize + 40;
    var b3 = 7 * tileSize + 50;
    var b4 = 7 * tileSize + 30;
    var points2 = b1 + "," + b2 + " " + b3 + "," + b2 + " " + b4 + "," + b1;

    return (
      <g>
        <polygon points={points1}/>
        <polygon points={points2}/>
      </g>
    );
  }
});

module.exports = CenterStar;
