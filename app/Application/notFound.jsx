var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
	render: function() {
		return <div>
			<h2>Page Not Found</h2>
			<p>The number you have dialed is no longer in service</p>
		</div>;
	}
});
