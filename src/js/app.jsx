var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');

// var data = [];

var CommentBox = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function () {
		var data = [
			{id: 1, author: "Pete Hunt", text: "This is one comment"},
			{id: 2, author: "Jordan Wlke", text: "This is *another* comment"}
		];

		setTimeout(function() {
			this.setState({data: data});
		}.bind(this), 2000);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = _.map(this.props.data, function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
	        );
		});

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});


$(document).on('ready', function() {
	ReactDOM.render(
	  <CommentBox />,
	  document.getElementById('content')
	);
});
