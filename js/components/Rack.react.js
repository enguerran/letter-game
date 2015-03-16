"use strict";

var React = require("react");
var Tile = require("./Tile.react");

var Rack = React.createClass({

  render: function() {
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
        <g>
          <path fill="#663300" d="M 0 0 h 480 v65 h -480 z" />
        </g>
        <g>
          <Tile playable={true} x="0" y="0" boardSize="900" letter="S" />
          <Tile playable={true} x="1" y="0" boardSize="900" letter="C" />
          <Tile playable={true} x="2" y="0" boardSize="900" letter="R" />
          <Tile playable={true} x="3" y="0" boardSize="900" letter="A" />
          <Tile playable={true} x="4" y="0" boardSize="900" letter="B" />
          <Tile playable={true} x="5" y="0" boardSize="900" letter="B" />
          <Tile playable={true} x="6" y="0" boardSize="900" letter="L" />
          <Tile playable={true} x="7" y="0" boardSize="900" letter="E" />
        </g>
      </svg>
    );
  }

});

module.exports = Rack;
