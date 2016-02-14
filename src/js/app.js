var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
    displayName: 'Hello',
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('container')
);
