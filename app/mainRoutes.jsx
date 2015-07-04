var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// polyfill
if(!Object.assign)
	Object.assign = React.__spread;

// export routes
module.exports = (
	<Route name="app" path="/" handler={require("./Application")}>
		<Route name="signIn" path="signIn" handler={require("./Application/signIn")} />
		<Route name="home" path="home" handler={require("./Application/home")} />

		<DefaultRoute handler={require("./Application/home")} />
		<NotFoundRoute handler={require("./Application/notFound")}/>
	</Route>
);
