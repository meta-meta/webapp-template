let actions = require('./actions');
let request = require('superagent-bluebird-promise');
let formTemplates = require('./formTemplates');
let initialState = require('./Application/initialState');
let _ = require('lodash');
let Promise = require('bluebird');

let cursor;
let router;

module.exports = {
    setCursor: (c) => { cursor = c; },
    setRouter: (r) => { router = r; }
};

const apiPrefix = '/api/v1/';

//TODO: Development Pleasure
const devServer = 'http://tma-1:4000';
//const devServer = '';

/**
 * for errors returned by the backend in a response body
 */
class ApiError extends Error {
    constructor(msg) {
        this.msg = msg;
    }
}

let formVals = form => _.mapValues(form.value, formField => formField.val);

let toObjById = collection => {
    let o = {};

    _.each(collection, member => {
        o[member.id] = member;
    });

    return o;
};

let apiRequest = opts => {
    cursor.refine('xhrResponse').set(undefined);
    return request[opts.action](devServer + apiPrefix + opts.path)
        .set('Accept', 'application/json')
        .query(opts.query)
        .send(opts.payload)
        .type('json')
        .then(res => {
            if (res.body.error) {
                throw new ApiError(res.body.error);
            } else {
                cursor.refine('xhrResponse').set(JSON.stringify(res.body));
                return res.body;
            }
        })
        .catch(ApiError, e => {
            console.log('A Server Error');
            console.log(e);
            throw e;
        })
        .catch(e => {
            console.log(e);
            throw e; // this prevents subsequent .then from being called
        });
};

let showError = msg => {
    cursor.refine('alerts').push([{msg, bsStyle: 'danger'}]);
};

Promise.onPossiblyUnhandledRejection(e => {
    showError('A possibly unhandled error: ' + e);
    console.log('A possibly unhandled error:');
    console.log(e);
});


let login = (opts) => {
    sessionStorage.setItem('authToken', opts.authToken);

    //TODO: rip this stuff out of cursor and use sessionStorage
    cursor.refine('account', 'authToken').set(opts.authToken);

};

const handlers = {

    UI: {
        closeModal: () => {
            cursor.refine('modal').set(undefined);
            cursor.refine('modalOpts').set({});
        }
    },

    Account: {
        login: (email, pwd) => {
            return apiRequest({
                action: 'post',
                path: 'accounts/login',
                query: {email, pwd}
            })
                .then(res => {
                    login(res.login);

                    // TODO: maybe turn checkIfSetupComplete into a promise and transition according to the result here
                    router.transitionTo('setup');
                })
                .catch(ApiError, err => {
                    cursor.refine('account', 'login', 'help').set({});
                    cursor.refine('account', 'login', 'help', 'email').set('wrong email or password');
                    cursor.refine('account', 'login', 'help', 'pwd').set('wrong email or password');
                });
        },

        logout: () => {
            sessionStorage.clear();
            cursor.set(initialState);

            router.replaceWith('home');
        }
    }
};

// This structure is purely for code navigation convenience
_.forEach(handlers, (fns, actionType) => {
    _.forEach(fns, (fn, action) => {
        let f = (...args) => fn.apply(fn, args);
        actions[actionType][action].listen(f);
    });
});