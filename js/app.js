var React = require('react');
var Board = require('./components/Board.react');

React.render(
    <Board x={15} y={15} size={900} />,
    document.getElementById('board')
);
