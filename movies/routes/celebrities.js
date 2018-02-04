const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

/* render the list page */
router.get('/', (req, res, next) => {
  Celebrity.find({}, (err, celebrities) => {
    if (err) {
      return next(err);
    }
    res.render('celebrities/index', {
      title: 'Celebrity Inventory',
      celebrities
    });
  });
});

/* render the create form */
router.get('/new', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  res.render('celebrities/new', {
    title: "Build Your Celebrity's Profile"
  });
});

/* handle the POST from the create form */
router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  const theCelebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  });

  theCelebrity.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

/* render the detail page */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    if (!celebrity) {
      res.status(404);
      const data = {
        title: '404 Not Found'
      };
      return res.render('not-found', data);
    }
    const data = {
      title: celebrity.name,
      celebrity
    };
    res.render('celebrities/detail', data);
  });
});

/* render the edit form */
router.get('/:id/edit', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  const id = req.params.id;
  Celebrity.findById(id, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    if (!celebrity) {
      res.status(404);
      const data = {
        title: '404 Not Found'
      };
      return res.render('not-found', data);
    }
    const data = {
      title: 'Edit ' + celebrity.name,
      celebrity
    };
    res.render('celebrities/edit', data);
  });
});

/* handle the POST from the edit form */
router.post('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  const id = req.params.id;
  const updates = {
    $set: {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
    }
  };
  Celebrity.update({_id: id}, updates, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result.n) {
      res.status(404);
      const data = {
        title: '404 Not Found'
      };
      return res.render('not-found', data);
    }
    res.redirect('/celebrities');
  });
});

/* handle the POST to delete one */
router.post('/:id/delete', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  const id = req.params.id;
  Celebrity.remove({_id: id}, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

module.exports = router;
