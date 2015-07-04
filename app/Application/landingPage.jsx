var React = require("react");
var ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
var Login = require('components/login');

var Button = require('react-bootstrap').Button;
var $ = require('jquery');
require('fullpage/jquery.fullpage');

var Home = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [ImmutableOptimizations(['cursor'])],

	render() {
		return <div>
			<div className="home-top">
				<div className="right" id="menu">
					<a data-menuanchor="how" href="#how">HOW IT WORKS</a>
					<a data-menuanchor="pricing" href="#pricing">PRICING</a>
					<a data-menuanchor="register" href="#register">REGISTER</a> |
					<a href="#" onClick={(evt)=>{this.props.cursor.refine('modal').set('login')}}>LOG IN</a>
				</div>
			</div>

			<div>
				<div id="fullpage">
					<div className="section" id="section1">
						<h2>HOW IT WORKS</h2>
					</div>
					<div className="section" id="section2">
						<h2>PRICING</h2>
					</div>
					<div className="section" id="section3">
						<Button bsStyle="primary" onClick={(evt) => {
							this.props.cursor.refine('modal').set('register')
						}}>GET STARTED</Button>
					</div>
				</div>
			</div>
		</div>;
	},

	componentDidMount() {
		$('#fullpage').fullpage({
			anchors: ['how', 'pricing', 'register'],
			menu: "#menu",
			fixedElements: '#header, #footer',
			paddingBottom: '100px',
			paddingTop: '100px'
		});
	},

	componentWillUnmount() {
		$.fn.fullpage.destroy('all');
	}

});

module.exports = Home;
