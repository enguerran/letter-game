var React = require('react');
var Tile = require('./Tile.react');
var CenterStar = require('./CenterStar.react');
var LetterTile = require('./LetterTile.react');

function getRandomLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

var Board = React.createClass({
  getInitialState: function() {
    return { letters: [], letterlist: [] }
  },
  render: function() {
    var i = 0;
    var letters = this.state.letters.map(function(letter) {
      return <LetterTile letter={letter.letter} x={letter.coordx} y={letter.coordy} boardSize={this.props.size} />
    }.bind(this));
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
      <svg onClick={this._handleClick} version="1.1" viewBox={viewBox} className="svg-board" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">
        <g>
          <g>
            <path fill="#19BE72" d={d} />
            {tiles}
            <CenterStar boardSize={this.props.size} />
            {letters}
          </g>
        </g>
      </svg>
    );
  },
  _handleClick: function(e) {
    if(e.target.getAttribute('data-type') === "letter") {
      return;
    }
    var x = e.target.getAttribute('data-coordx');
    var y = e.target.getAttribute('data-coordy');
    var reactid = e.target.getAttribute('data-reactid');
    var letters = this.state.letters;
    var letterlist = this.state.letterlist;

    if(letterlist.indexOf(reactid) === -1) {
      letterlist.push(reactid);
      letters.push({reactid: reactid, letter: getRandomLetter(), coordx: x, coordy: y});
      this.setState({ letters: letters, letterlist: letterlist});
    }
  }
});

module.exports = Board;
