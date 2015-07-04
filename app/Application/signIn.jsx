let React = require('react');
let ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
let _ = require('lodash');
let Panel = require('react-bootstrap').Panel;

let SignIn = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [ImmutableOptimizations(['cursor'])],

	getRoute() {
	 	return _.last(this.context.router.getCurrentPath().split('/'));
	},

	render() {
		let cursor = this.props.cursor.refine('account', this.getRoute());

		return <Panel className="container sign-in">

			<div id="g-signin2" data-onsuccess={this.onSignIn} />

		</Panel>;
	},

	componentDidMount() {
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': this.onSignIn
		});
	},

	onSignIn(googleUser) {
		let profile = googleUser.getBasicProfile();
		sessionStorage.setItem('authToken', profile.getId());
		sessionStorage.setItem('name', profile.getName());
		sessionStorage.setItem('imageUrl', profile.getImageUrl());
		sessionStorage.setItem('email', profile.getEmail());

		let account = this.props.cursor.refine('account');
		account.refine('authToken').set(sessionStorage.getItem('authToken'));
		account.refine('name').set(sessionStorage.getItem('name'));
		account.refine('imageUrl').set(sessionStorage.getItem('imageUrl'));
		account.refine('email').set(sessionStorage.getItem('email'));
	}
});

module.exports = SignIn;