var React = require('react');

var Board = React.createClass({
  render: function() {

  return (
    <svg width="600" height="600" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="red" />
      <circle cx="50%" cy="50%" r="50%" fill="green" />
      <text x="50%" y="60%" fontSize="150" textAnchor="middle" fill="white">SVG</text>
    </svg>
    );
  }
});

module.exports = Board;
