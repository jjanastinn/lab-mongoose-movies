const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

router.get('/', function (req, res, next) {
  Celebrity.find({}, (err, celebritiesArray) => {
    if (err) {
      return next(err);
    }
    const data = {
      title: 'Celebrity Inventory',
      celebrities: celebritiesArray
    };

    res.render('celebrities/index', data);
  });
});

router.get('/new', function (req, res, next) {
  res.render('celebrities/new', {
    title: 'Build your celebrity'
  });
});

router.post('/', function (req, res, next) {
  const theCelebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  });
  theCelebrity.save((err) => {
    if (err) {
      res.render('celebrities/new', {
        title: 'Build your celebrity profile'
      });
    } else {
      res.redirect('/celebrities');
    }
  });
});

router.get('/:id', (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    const data = {
      celebrity: celebrity
    };
    res.render('celebrities/show', data);
  });
});

router.post('/:id', (req, res, next) => {
  const delCeleb = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  };
  const celebrityId = req.params.id;

  Celebrity.findByIdAndUpdate(celebrityId, delCeleb, (err, result) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

router.get('/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    const data = {
      celebrity: celebrity
    };
    res.render('celebrities/edit', data);
  });
});

router.post('/:id/delete', function (req, res, next) {
  const celebrityId = req.params.id;

  Celebrity.findByIdAndRemove(celebrityId, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

module.exports = router;
