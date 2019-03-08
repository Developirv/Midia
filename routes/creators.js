
var router = require('express').Router();
var studentsCtrl = require('../controllers/students');

// GET 
router.get('/creators', creatorsCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/facts', isLoggedIn, creatorsCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', creatorsCtrl.delFact);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;