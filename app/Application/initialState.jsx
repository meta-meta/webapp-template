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

    isInitialDataLoaded: true,


    ui: {},

    data: {
        12345: {
            id: 12345,
            author: 'Paul',
            data: {
                text: 'a comment. this is a comment that is going to be the root node. all other comments are in this thread'
            },
            rating: 0,
            created: new Date(),

            children: {
                23456: {
                    id: 23456,
                    author: 'Matt',
                    data: {
                        text: 'a reply to a comment'
                    },
                    rating: 0,
                    created: new Date(),

                    children: {
                        45678: {
                            id: 45678,
                            author: 'Paul',
                            data: {
                                text: 'a reply to Matt\'s reply'
                            },
                            rating: 0,
                            created: new Date(),

                            children: {
                                45678: {
                                    id: 45678,
                                    author: 'Paul',
                                    data: {
                                        text: 'a reply to Matt\'s reply'
                                    },
                                    rating: 0,
                                    created: new Date(),

                                    children: {}
                                },
                                56789: {
                                    id: 56789,
                                    author: 'Kaya',
                                    data: {
                                        text: 'a reply to Matt\'s reply'
                                    },
                                    rating: 0,
                                    created: new Date(),

                                    children: {
                                        45678: {
                                            id: 45678,
                                            author: 'Paul',
                                            data: {
                                                text: 'a reply to Matt\'s reply'
                                            },
                                            rating: 0,
                                            created: new Date(),

                                            children: {}
                                        },
                                        56789: {
                                            id: 56789,
                                            author: 'Kaya',
                                            data: {
                                                text: 'a reply to Matt\'s reply'
                                            },
                                            rating: 0,
                                            created: new Date(),

                                            children: {
                                                45678: {
                                                    id: 45678,
                                                    author: 'Paul',
                                                    data: {
                                                        text: 'a reply to Matt\'s reply'
                                                    },
                                                    rating: 0,
                                                    created: new Date(),

                                                    children: {}
                                                },
                                                56789: {
                                                    id: 56789,
                                                    author: 'Kaya',
                                                    data: {
                                                        text: 'a reply to Matt\'s reply'
                                                    },
                                                    rating: 0,
                                                    created: new Date(),

                                                    children: {}
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        56789: {
                            id: 56789,
                            author: 'Kaya',
                            data: {
                                text: 'a reply to Matt\'s reply'
                            },
                            rating: 0,
                            created: new Date(),

                            children: {}
                        }
                    }
                },

                34567: {
                    id: 34567,
                    author: 'Adam',
                    data: {
                        text: 'a different reply to a comment'
                    },
                    rating: 0,
                    created: new Date(),

                    children: {}
                }

            }
        }
    },

    forms: {
        options: {
        }
    }
};

module.exports = InitialState;