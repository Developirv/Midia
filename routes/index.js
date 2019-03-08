var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Midia' });
});

/* GET midia page. */
router.get('/midia' , function(req, res) {
  res.render('midia' , {title: 'Midia Tent' });

});



/* GET New Creator page. */
router.get('/newcreator', function(req, res) {
  var db = req.db;
  var collection = db.get('newCreator');
  collection.find({},{},function(e,docs){
  res.render('/newcreator', { title: 'Do you know a Creator?' });
  'New Creator' : docs
      });
    });
  });


/* GET New Midia page. */
router.get('/newMidia', function(req, res) {
  res.render('newMidia', { title: 'Provide New Midia for the world' });
});

/* POST to New Creator page */
router.post('/newcreator', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var inputCreator = req.body.inputCreator;
  var inputTitle = req.body.inputTitle;
  var inputType = req.body.inputType;
  var inputWebsite = req.body.inputWebsite;
  var inputDescription = req.body.inputDescription;
  var inputDate = req.body.inputDate;

  // Set our collection
  var collection = db.get('newcreator');

  // Submit to the DB
  collection.insert({
      "Creator" : inputCreator,
      "Content Title" : inputTitle,
      "Media Type" : inputType,
      "Website" : inputWebsite,
      "Description" : inputDescription,
      "Upload Date" : inputDate,
  }, function (err, doc) {
      if (err) {
          // return error
          res.send("There was a problem adding this creator to Midia.");
      }
      else {
          // success page
          res.redirect('newcreator');
      }
  });
});



/* POST to New Midia page */

router.post('/newMidia', function(req, res) {

  // Set internal DB variable
  var db = req.db;

 
 // Get form values.
 
 var inputTitle = req.body.inputTitle;
 var inputCreator = req.body.inputCreator;
 var inputType = req.body.inputType;
 var inputWebsite = req.body.inputWebsite;
 var inputDescription = req.body.inputDescription;
 var inputDate = req.body.inputDate;

  // Set collection
  var collection = db.get('newMidia');

  // Submit to the DB
  collection.insert({
    "Content Title" : inputTitle,
    "Creator" : inputCreator,
    "Media Type" : inputType,
    "Website" : inputWebsite,
    "Description" : inputDescription,
    "Upload Date" : inputDate,
  }, function (err, doc) {
      if (err) {
          // return error
          res.send("There was a problem adding this content to the Midia Tent. Please try again!");
      }
      else {
          // success page
          res.redirect('/newMidia');
      }
  });
});



module.exports = router;
