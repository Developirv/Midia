
var router = require('express').Router();
var creatorsCtrl = require('../controllers/creators');

// GET 
router.get('/creators', creatorsCtrl.index);

// POST /facts

router.post('/creators', isLoggedIn, creatorsCtrl.addFact);

// DELETE /facts/

router.delete('/creators/:id', creatorsCtrl.delFact);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;