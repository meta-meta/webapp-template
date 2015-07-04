let formTemplates = require("../formTemplates");

const InitialState = {
    modal: undefined,
    modalOpts: {},
    alerts: [],

    router: {
        path: undefined,
        currentRoutes: undefined,
        params: undefined
    },

    account: {
        authToken: undefined
    },

    isInitialDataLoaded: false,


    ui: {},

    data: {},

    forms: {
        options: {
        }
    }
};

module.exports = InitialState;