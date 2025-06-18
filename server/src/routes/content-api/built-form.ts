'use strict';

export default [
	{
		method: 'GET',
		path: '/built-form',
		handler: 'built-form.find',
	},
	{
		method: 'POST',
		path: '/built-form',
		handler: 'built-form.create',
	},
	{
		method: 'DELETE',
		path: '/built-form/:id',
		handler: 'built-form.delete',
	},
	{
		method: 'PUT',
		path: '/built-form/:id',
		handler: 'built-form.update',
	},
];
