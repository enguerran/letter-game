"use strict";

var React = require("react");
var PlayActionCreators = require("../actions/PlayActionCreators");
import { getBonus } from "../utils/Game";

function getColor(x, y) {
  var bonus = getBonus(x, y);
  if(bonus === "TLS") {
    return "#0000FF";
  }
  if(bonus === "TWS") {
    return "#FF0000";
  }
  if(bonus === "DWS") {
    return "#FF80E5";
  }
  if(bonus === "DLS") {
    return "#00C0FF";
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
    case "K":
    case "W":
    case "X":
    case "Y":
    case "Z":
      return 10;
    case "J":
    case "Q":
      return 8;
    case "F":
    case "H":
    case "V":
      return 4;
    case "B":
    case "C":
    case "P":
      return 3;
    case "D":
    case "G":
    case "M":
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
  getInitialState: function() {
    return { unactive: false };
  },
  render: function() {
    var strokeWidth = 5;
    var x = this.props.x, y = this.props.y;
    var size = ((this.props.boardSize - (strokeWidth * 15/16)) / 15);
    var coordx = x * size + strokeWidth/2;
    var coordy = y * size + strokeWidth/2;

    var d = getSVGCoordinates(coordx, coordy, size);
    var color = getColor(x, y);

    var path = <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />;

    var tile = (
      <g title={x+"-"+y} data-type="tile" data-coordx={x} data-coordy={y}>
        {path}
      </g>
    );

    if(isCenterTile(x, y)) {
      var polygon = drawCenterStar(this.props.boardSize);
      tile = (
        <g title={x+"-"+y} data-type="tile" data-coordx={x} data-coordy={y}>
          {path}
          <polygon points={polygon[0].points}/>
          <polygon points={polygon[1].points}/>
        </g>
      );
    }

    if(this.props.letter !== undefined) {
      if(this.state.unactive) {
        color = "#cccccc";
        tile = (
          <g data-type="letter" data-coordx={x} data-coordy={y}>
            <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
            <text x={coordx + 60/2} y={coordy + 40} style={style.letter} textAnchor="middle" >{this.props.letter}</text>
            <text x={coordx + 50} y={coordy + 50} style={style.point} textAnchor="middle">{getPoint(this.props.letter)}</text>
          </g>
        );
      }
      else {
        color = "#D4C462";
        tile = (
          <g onClick={this._handleClick} data-type="letter" data-coordx={x} data-coordy={y}>
            <path fill={color} stroke="#000000" strokeWidth={strokeWidth} d={d} />
            <text x={coordx + 60/2} y={coordy + 40} style={style.letter} textAnchor="middle" >{this.props.letter}</text>
            <text x={coordx + 50} y={coordy + 50} style={style.point} textAnchor="middle">{getPoint(this.props.letter)}</text>
          </g>
        );
      }
    }

    return tile;
  },
  _handleClick: function(event) {
    if(this.props.playable && !this.state.unactive) {
      PlayActionCreators.playLetter(this.props.letter);
      this.setState({unactive: true});
    }
  }
});

module.exports = Tile;
