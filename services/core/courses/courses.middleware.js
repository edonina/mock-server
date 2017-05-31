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
		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});

	router.post('/courses/delete', (req, res, next) => {
		let courses = server.db.getState().courses;
		let courseArrayIndex = courses.findIndex(course => course.id === req.body.id);
		//console.log('req.body.id ',req.body.id);

		console.log(courseArrayIndex);
		if (courseArrayIndex != -1) {
			//console.log(courses);
			courses.splice(courseArrayIndex, 1);
			//console.log(courses);
			//server.db.setState({'courses':courses});
		}
		res.json(courses);
	});

	router.post('/courses/get', (req, res, next) => {
		let courses = server.db.getState().courses;
		let courseArrayIndex = courses.findIndex(course => course.id === req.body.id);
		//console.log('req.body.id ',req.body.id);

		console.log(courseArrayIndex);
		if (courseArrayIndex != -1) {
			res.json(courses[courseArrayIndex]);
		}else{
			res.json([]);
		}

	});

	router.post('/courses/save', (req, res, next) => {
		let courses = server.db.getState().courses;
		let course = req.body.course;
		let courseArrayIndex = courses.findIndex(course => course.id === course.id);
		console.log(courseArrayIndex);
		if (courseArrayIndex != -1) {
			courses[courseArrayIndex] = course;
			res.json(courses[courseArrayIndex]);
		} else {
			res.json([]);
		}
	});
	
	return router;
};
