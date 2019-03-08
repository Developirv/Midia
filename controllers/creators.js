const creator = require('../models/creator');

module.exports = {
  index,
  addFact,
  delFact
};

function index(req, res, next) {
  console.log(req.query)
  

  // User has submitted 
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Creator.find(modelQuery)
  .sort(sortKey).exec(function(err, creators) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('midia/index', {
      Creators,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}

function addFact(req, res, next) {
  req.user.facts.push(req.body);
  req.user.save(function(err) {
    res.redirect('/creators');
  });
}

function delFact(req, res, next) {
  Creator.findOne({'facts._id': req.params.id}, function(err, creator) {
    creator.facts.id(req.params.id).remove();
    creator.save(function(err) {
      res.redirect('/creators');
    });
  });
}