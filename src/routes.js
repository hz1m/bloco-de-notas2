const express = require('express');
const routes = express.Router();
const annotationController = require('./controllers/annotationController');
const priorityController = require('./controllers/priorityController');
const contentController = require('./controllers/contentController');

routes.post('/annotations', annotationController.create);
routes.get('/annotations', annotationController.read);
routes.delete('/annotations/:id', annotationController.delete);
routes.get('/priorities', priorityController.read);
routes.post('/priorities/:id', priorityController.update);
routes.post('/contents/:id', contentController.update);

module.exports = routes;
