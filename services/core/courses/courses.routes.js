// REWRITE EXAMPLE
const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
	'/courses': '/courses',
	'/courses/delete': '/courses/delete',
	'/courses/:id': '/courses/:id',
	'/courses/save': '/courses/save',
	'/courses/get': '/courses/get',
}));

module.exports = router;
