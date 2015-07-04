let React = require("react");
let Router = require("react-router");
let routes = require("../app/" + __resourceQuery.substr(1) + "Routes");
let $ = require('jquery');
let _ = require('lodash');

window.React = React;

// react-router handles location
Router.run(routes, Router.HistoryLocation, function (Application, state) {
    let router = this;

    // Google Sign-in
    $('head').append(`<meta name="google-signin-client_id" content="273759393700-e99666pelvfos0os4tk654skte3sgm0g.apps.googleusercontent.com">`);
    $('head').append(`<script src="https://apis.google.com/js/platform.js" async defer></script>`);

    let renderReact = () => {
        if(typeof gapi == 'undefined') {
            console.log('no gapi yet');
            _.debounce(renderReact, 500)();
        } else {
            React.render(<Application />, document.getElementById("content"));
        }
    };


    renderReact();


});
