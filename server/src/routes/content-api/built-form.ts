'use strict';

export default [
	{
		method: 'GET',
		path: '/built-form',
		handler: 'builtFormController.find',
	},
	{
		method: 'POST',
		path: '/built-form',
		handler: 'builtFormController.create',
	},
	{
		method: 'DELETE',
		path: '/built-form/:id',
		handler: 'builtFormController.delete',
	},
	{
		method: 'PUT',
		path: '/built-form/:id',
		handler: 'builtFormController.update',
	},
];
