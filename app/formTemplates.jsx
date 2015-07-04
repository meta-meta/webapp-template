let _ = require('lodash');

const formFieldBase = {val: undefined, isValid: undefined, help: undefined};
const mergeWithBaseFields = _.partialRight(_.mapValues, field => field && Object.assign(
    {}, formFieldBase, field, {placeholder: field.label, label: field.label + (field.isRequired ? '*' : '')})
);

const isRequired = true; // just for object literal shorthand

module.exports = {
    makeFormFromValues: (obj, formTemplate) => {
        return _.mapValues(formTemplate, (formField, key) => {
            return Object.assign({}, formField, {val: obj && obj[key]});
        })
    }
};