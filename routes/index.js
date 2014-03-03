
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Shopping List', name: 'keith'});
};

exports.register = function(req, res){
	res.render('register', { title: 'Shopping List'});
};

exports.registerUser = function(req, res){


	res.redirect('/');
};