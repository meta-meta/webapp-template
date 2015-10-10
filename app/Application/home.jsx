let React = require('react');
let RouteHandler = require("react-router").RouteHandler;
let ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
let _ = require('lodash');
let Panel = require('react-bootstrap').Panel;

let Comment = React.createClass({

	render() {
		let comment = this.props.comment;

		return <div className='comment-container'>
			<div className='comment color1'>
				<h3>{comment.author}</h3>
				<p>{comment.data.text}</p>
			</div>
			{comment.children ? <Comments comments={comment.children}/> : null}
		</div>
	}
});

let Comments = React.createClass({
	render() {
		let comments = this.props.comments;

		return <div className={'comments ' + this.props.className}>
			{_.map(comments, comment => <Comment comment={comment} />)}


		</div>
	}
});

let Home = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [ImmutableOptimizations(['cursor'])],

	render() {
		let cursor = this.props.cursor.refine('account');
		let data = this.props.cursor.refine('data').value;

		let url = cursor.refine('imageUrl').value;

		return <Panel className="container home main-content">
			<div className="avatar" style={url ? {backgroundImage: `url('${url}')`} : null} />
			<h1>Welcome back, {cursor.refine('name').value}</h1>
			<Comments className='outermost' comments={data} />
		</Panel>;
	}
});
module.exports = Home;