var React = require("react");
var Router = require("react-router");
var routes = require("../app/" + __resourceQuery.substr(1) + "Routes");

window.React = React;

// react-router handles location
Router.run(routes, Router.HistoryLocation, function(Application, state) {
	var router = this;
	React.render(<Application />, document.getElementById("content"));
});
