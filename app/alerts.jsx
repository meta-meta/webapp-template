let Alert = require('react-bootstrap').Alert;
let Button = require('react-bootstrap').Button;
let React = require('react');
let _ = require('lodash');

const configs = {
    selectColleague: {
        msg: 'Select or add a colleague with whom you would like to better communicate.',
        bsStyle: 'info'
    }
};

/* alert can be a config object or a key for config object defined above */
let Alerts = alertsCursor =>
    _.map(alertsCursor.value, (alert, i, alerts) => {

        let otherAlerts = alerts.slice();
        otherAlerts.splice(i, 1); // the value that alertsCursor will have if this alert is dismissed

        return <Alert
            className='container'
            bsStyle={_.isObject(alert) ? alert.bsStyle : configs[alert].bsStyle}>
            {_.isObject(alert) ? alert.msg : configs[alert].msg}
            <Button bsStyle='link' onClick={_.partial(alertsCursor.set, otherAlerts)}>
                <i className='fa fa-times-circle'/>
            </Button>
        </Alert>
});

module.exports = Alerts;
