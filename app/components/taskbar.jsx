let React = require("react");
let AccountActions = require("../actions").Account;

let Navbar = require('react-bootstrap').Navbar;
let Nav = require('react-bootstrap').Nav;
let NavItem = require('react-bootstrap').NavItem;
let _ = require('lodash');

let ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;

let routes = [
    {route: 'home', label: 'home'},
    {route: 'logout', label: 'sign out'}
];

let Taskbar = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    mixins: [ImmutableOptimizations(['router', 'account'])],

    render() {

        let activeLink = _.first(_.intersection(this.props.router.refine('currentRoutes').value, _.keys(routes)));

        return <Navbar brand='' toggleNavKey={0}>
            <Nav navbar right eventKey={0} onSelect={this.handleNav}>

                {
                    _.map(routes, r => <NavItem
                        active={_.isEqual(activeLink, r.route)}
                        eventKey={r.route}
                        >
                        {r.label}
                    </NavItem>)
                }

                {
                    /*<DropdownButton eventKey={3} title='Dashboard' onSelect={this.handleNav}>
                     <MenuItem eventKey='library'>Library</MenuItem>
                     <MenuItem eventKey='approach'>Our Approach</MenuItem>
                     <MenuItem divider />
                     <MenuItem eventKey='resetPassword'>Reset Password</MenuItem>
                     <MenuItem eventKey='logout'>Logout</MenuItem>
                     </DropdownButton>*/
                }

                {
                    /*<NavItem>
                     {authToken ?
                     <OverlayTrigger trigger='hover' placement='bottom'
                     overlay={<Popover title='FYI'>{fyi}</Popover>}>
                     <p>Logged in as {email}. AuthToken: {authToken}</p>
                     </OverlayTrigger>
                     : null
                     }
                     </NavItem>*/
                }

            </Nav>
        </Navbar>;
    },

    handleNav(key) {
        let links = _(routes)
            .map(r => [r.route, _.partial(this.context.router.transitionTo, r.route)])
            .zipObject()
            .value();

        const navHandlers = _.extend(links, {
            logout() {
                AccountActions.logout();
            }
        });

        navHandlers[key]();
    }
});

module.exports = Taskbar;
