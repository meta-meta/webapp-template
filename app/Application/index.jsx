let React = require("react");
let RouteHandler = require("react-router").RouteHandler;
let Cursor = require('react-cursor').Cursor;
let actionHandlers = require("../actionHandlers");
let Alerts = require("../alerts");
let AccountActions = require('../actions').Account;

let Taskbar = require('components/taskbar');

let OverlayMixin = require('react-bootstrap').OverlayMixin;
let Modal = require('react-bootstrap').Modal;

let _ = require('lodash');

require("./style.less");

let Application = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [OverlayMixin],

	getInitialState: _.constant(require('./initialState')),

	isSignedIn() {
		if(!!this.state.account.authToken) {
			return true;
		} else {
			// Load everything based on sessionStorage
			let sessionToken = sessionStorage.getItem('authToken');

			if(sessionToken) {
				let account = Cursor.build(this).refine('account');
				account.refine('authToken').set(sessionToken);
				account.refine('name').set(sessionStorage.getItem('name'));
				account.refine('imageUrl').set(sessionStorage.getItem('imageUrl'));
				account.refine('email').set(sessionStorage.getItem('email'));

				return true;
			} else {
				return false;
			}
		}
	},

	checkAuthorization() {
		if(!this.isSignedIn()) {
			if(!_.contains(['/signIn'], this.context.router.getCurrentPath())) {
				this.context.router.replaceWith('signIn');
			}
		} else {
			if(_.contains(['/signIn'], this.context.router.getCurrentPath())) {
				this.context.router.replaceWith('home');
			}
		}
	},

	componentDidUpdate() {
		this.checkAuthorization();
	},

	componentDidMount() {
		this.checkAuthorization();
	},

	updateRouterState() {
		this.setState({router: {
			path: this.context.router.getCurrentPath(),
			params: this.context.router.getCurrentParams(),
            currentRoutes: _.pluck(this.context.router.getCurrentRoutes(), 'name')
		}});
	},

	componentWillMount() {
		this.updateRouterState();
	},

	componentWillReceiveProps() {
		this.updateRouterState();
	},

	render() {
		this.cursor = Cursor.build(this);
		actionHandlers.setCursor(this.cursor);
		actionHandlers.setRouter(this.context.router);

		// TODO: this is just for dev convenience. Remove for prod.
		window.cursor = this.cursor;
		window.router = this.context.router;
		window.actions = require('../actions');

		let isAppPage = !_.contains(['/signIn'], this.context.router.getCurrentPath());
		let isLoading = isAppPage && !(this.cursor.refine('isInitialDataLoaded')).value;

		return <div className={"application"}>
            <Taskbar
                router={this.cursor.refine('router')}
                account={this.cursor.refine('account')}
                />

			{_.isEmpty(this.state.alerts) ? null
				: Alerts(this.cursor.refine('alerts'))
			}

			{isLoading ? <div className="loading"><i className="fa fa-cog fa-spin" /> Loading Data...</div> : <RouteHandler cursor={this.cursor} />}

		</div>;
	},

	// This is called by the `OverlayMixin` when this component
	// is mounted or updated and the return value is appended to the body.
	renderOverlay() {
		if (!this.state.modal) {
			return <span/>;
		}

		let modal = {
			test: {
				title: 'Test Modal',
				component: <div>This is a test</div>
			}
		}[this.state.modal];

		return (
			<Modal bsStyle="primary"
				   closeButton={false}
				   bsSize={modal.bsSize || 'medium'}
				   title={modal.title}
				   onRequestHide={this.handleClose}>
				{modal.component}
			</Modal>
		);
	},

	handleClose() {
		this.setState({
			modal: undefined
		});
	}
});
module.exports = Application;
