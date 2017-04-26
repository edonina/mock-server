// REWRITE EXAMPLE
const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
	'/courses': '/courses',
	'/courses/delete': '/courses/delete',
	'/courses/:id': '/courses/:id',
}));

module.exports = router;
