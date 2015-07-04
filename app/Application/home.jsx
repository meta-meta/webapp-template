let React = require('react');
let RouteHandler = require("react-router").RouteHandler;
let ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
let _ = require('lodash');
let Panel = require('react-bootstrap').Panel;

let Home = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [ImmutableOptimizations(['cursor'])],

	render() {
		let cursor = this.props.cursor.refine('account');

		let url = cursor.refine('imageUrl').value;

		return <Panel className="container home main-content">
			<div className="avatar" style={url ? {backgroundImage: `url('${url}')`} : null} />
			<h1>Welcome back, {cursor.refine('name').value}</h1>
		</Panel>;
	}
});
module.exports = Home;