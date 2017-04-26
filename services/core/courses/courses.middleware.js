const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);
		if(queryStr){
			courses = courses.filter((el) => {
					return el['name'].toLowerCase().indexOf(queryStr) >= 0;
			});
		}
		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});

	router.post('/courses/delete', (req, res, next) => {
		let courses = server.db.getState().courses;
		let courseArrayIndex = courses.findIndex(course => course.id === req.body.id);

		console.log(courseArrayIndex);
		if (courseArrayIndex != -1) {
			courses.splice(courseArrayIndex, 1);
		}



		res.json(courses);
	});
	
	return router;
};
