var React = require('react');
var Tile = require('./Tile.react');
var SampleStore = require('../stores/SampleStore');

function getRandomLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

function getKey(x, y) {
  return x + "-" + y;
}

var Board = React.createClass({
  getInitialState: function() {
    return { letters: [], activeLetter: '' };
  },
  componentDidMount: function() {
    SampleStore.addChangeListener(this._onChange);
  },
  render: function() {

    var tiles = [];
    var letter;
    var key;
    for(var i = 0 ; i < 15 ; i++) {
      for(var j = 0 ; j < 15 ; j++) {
        key = getKey(i,j);
        letter = this.state.letters[key] ? this.state.letters[key].letter : undefined;
        tiles.push(<Tile key={key} x={i} y={j} boardSize={this.props.size} letter={letter} />);
      }
    }
    var width = this.props.size, height = this.props.size;
    var d = "M 0 0 h " + width + " v " + height + " H 0 V 0 z";
    var viewBox = "0 0 " + width + " " + height;
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={this._handleClick} viewBox={viewBox} className="svg-board" preserveAspectRatio="xMinYMin meet">
        <g>
          <path fill="#19BE72" d={d} />
        </g>
        <g>
          {tiles}
        </g>
      </svg>
    );
  },
  _handleClick: function(e) {
    if(this.state.activeLetter === '') {
      return;
    }
    var target = e.target;
    while(!target.hasAttribute('data-type')) {
      if(target.nodeName.toLowerCase() === 'svg') {
        return;
      }
      target = target.parentNode;
    }

    if(target.getAttribute('data-type') === "letter") {
      return;
    }
    var x = target.getAttribute('data-coordx');
    var y = target.getAttribute('data-coordy');
    var letters = this.state.letters;
    var key = getKey(x, y);
    if(letters.indexOf(key) === -1) {
      letters[key] = { letter: this.state.activeLetter };
      this.setState({ letters : letters, activeLetter: '' });
    }
  },
  _onChange: function(e) {
    this.setState({ activeLetter: SampleStore.getActiveLetter() });
  }
});

module.exports = Board;
