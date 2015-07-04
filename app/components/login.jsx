var React = require("react");
var Link = require("react-router").Link;
var Account = require("../actions").Account;

var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;

var Login = React.createClass({
    mixins: [require('mixins/FormKeyboardHelper')],

    render() {
        var cursor = this.props.cursor;
        var email = cursor.value.email;
        var pwd = cursor.value.pwd;

        var help = cursor.value.help;
        var emailHelp = help && help.email;
        var pwdHelp = help && help.pwd;

        return <div className="login">
            <Input
                type="text"
                value={email}
                label="Email"
                hasFeedback
                help={emailHelp}
                bsStyle={emailHelp? 'error' : null}
                onChange={(evt) => {
                    cursor.refine('email').set(evt.target.value);
                }}
            />

            <Input
                type="password"
                value={pwd}
                label="Password"
                hasFeedback
                help={pwdHelp}
                bsStyle={pwdHelp? 'error' : null}
                onChange={(evt) => {
                    cursor.refine('pwd').set(evt.target.value);
                }}
            />

            <Button bsStyle="primary" onClick={() => {
                Account.login(email, pwd);
            }}>Login</Button>

            <a href="#" onClick={(evt) => {Account.forgotPassword()}} > Forgot Password</a>
        </div>;
    }
});

module.exports = Login;
