var React = require('react');
var Board = require('./components/Board.react');
require('../css/normalize.css');
require('../css/app.css');

React.render(
    <Board size={900} />,
    document.getElementById('board')
);
