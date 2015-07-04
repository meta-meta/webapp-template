var Actions = require('items-store/Actions');

// All the actions of the application

exports.UI = Actions.create([
	'closeModal'
]);

exports.Account = Actions.create([
	'login',
	'logout'
]);
