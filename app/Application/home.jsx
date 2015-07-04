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

	getRoute() {
	 	return _.last(this.context.router.getCurrentPath().split('/'));
	},

	render() {
		let cursor = this.props.cursor.refine('account', this.getRoute());

		return <Panel className="container home main-content">

		</Panel>;
	}
});
module.exports = Home;