var React = require('react');

function getColor(x, y) {
  if(x % 4 === 1 && y % 4 === 1) {
    if((x-1)%12 !== 0 || (y-1)%12 !== 0) {
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
  return "#19BE72";
}

function getSVGCoordinates(coordx, coordy, size) {
  var d = "M " + coordx + " " + coordy + " h " + size + " v " + size + " h -" + size + " v -" + size + " Z";
  return d;
}

function isCenterTile(x, y) {
  return x === 7 && y === 7;
}

var style = {
  letter: {
    fill: "#003300",
    fontSize: "40px",
    fontFamily: "sans-serif"
  },
  point: {
    fill: "#003300",
    fontSize: "12px",
    fontFamily: "sans-serif"
  }
};

function getPoint(letter) {
  switch(letter) {
    case 'K':
    case 'W':
    case 'X':
    case 'Y':
    case 'Z':
      return 10;
    case 'J':
    case 'Q':
      return 8;
    case 'F':
    case 'H':
    case 'V':
      return 4;
    case 'B':
    case 'C':
    case 'P':
      return 3;
    case 'D':
    case 'G':
    case 'M':
      return 2;
    default:
      return 1;
  }
}

function drawCenterStar(boardSize) {
  var tileSize = boardSize / 15;

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

  return [{points: points1}, {points: points2}];
}

var Tile = React.createClass({
  render: function() {
    var strokeWidth = 5;
    var x = this.props.x, y = this.props.y;
    var size = ((this.props.boardSize - (strokeWidth * 15/16)) / 15);
    var coordx = x * size + strokeWidth/2;
    var coordy = y * size + strokeWidth/2;

    var d = getSVGCoordinates(coordx, coordy, size);
    var color = getColor(x,y);

    var tile = (
      <g data-type="tile" data-coordx={x} data-coordy={y}>
        <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
      </g>
    );

    if(isCenterTile(x,y)) {
      var polygon = drawCenterStar(this.props.boardSize);
      tile = (
        <g data-type="tile" data-coordx={x} data-coordy={y}>
          <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
          <polygon points={polygon[0].points}/>
          <polygon points={polygon[1].points}/>
        </g>
      );
    }

    if(this.props.letter !== undefined) {
      color = "#D4C462";
      tile = (
        <g data-type="letter" data-coordx={x} data-coordy={y}>
          <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
          <text x={coordx + 60/2} y={coordy + 40} style={style.letter} textAnchor="middle" >{this.props.letter}</text>
          <text x={coordx + 50} y={coordy + 50} style={style.point} textAnchor="middle">{getPoint(this.props.letter)}</text>
        </g>
      );
    }

    return tile;
  }
});

module.exports = Tile;
