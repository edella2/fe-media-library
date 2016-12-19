module.exports = function(options) {
  var singularName = options.singularName;
  var pluralName = options.pluralName;

  return function(app, data) {
    var express = require('express');
    var theRouter = express.Router();
    var bodyParser = require('body-parser');
    theRouter.use(bodyParser.json());
    theRouter.use(bodyParser.urlencoded({
      extended: true
    }));

    theRouter.get('/', function(req, res) {
      var page = parseInt(req.query.page) || 1;
      var per_page = parseInt(req.query.per_page) || 20;
      var sort_on = req.query.sort_on || 'created_at';
      var sort_direction = req.query.sort_direction || 'asc';
      var response = {};
      var allRecords = data.all(singularName);

      var records = allRecords.sort(function(a, b) {
        if (a[sort_on] > b[sort_on]) {
          return -1;
        } else if (a[sort_on] < b[sort_on]) {
          return 1;
        } else {
          return 0;
        }
      });

      if (sort_direction === 'desc') {
        records = records.reverse();
      }

      var start = (page - 1) * per_page;
      var end = start + per_page;
      records = records.slice(start, end);

      response[pluralName] = records;
      response['meta'] = {
        total: allRecords.length,
        total_pages: Math.ceil(allRecords.length / per_page),
      };
      res.json(response);
    });

    theRouter.post('/', function(req, res) {
      var requestData = req.body;
      var response = {};
      response[singularName] = data.save(singularName, requestData[singularName]);

      res.json(response);
    });

    theRouter.get('/:id', function(req, res) {
      var response = {};
      response[singularName] = data.find(singularName, req.params.id);

      res.json(response);
    });

    theRouter.put('/:id', function(req, res) {
      var requestData = req.body;
      var response = {};
      response[singularName] = data.save(singularName, requestData[singularName]);

      res.json(response);
    });

    theRouter.delete('/:id', function(req, res) {
      if (data.destroy(singularName, req.params.id)) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    });

    app.use('/api/' + pluralName, theRouter);
  };
};
