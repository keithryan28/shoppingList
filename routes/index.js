
/*
 * GET home page.
 */

exports.index = function(req, res){

  res.render('index', { title: 'Shopping List', name: 'keith'});
};

exports.register = function(req, res){
	res.render('register', { title: 'Shopping List'});
};

exports.listDisplay = function(req, res){

	res.render('listDisplay');

};



exports.registerUser = function(req, res){
	//bring in the database connection
	var db = req.app.settings.db;
	//gather the variables from the input fields
	var uname = req.param('username');
	var pwd = req.param('password');

	if(uname && pwd){

		//create database collection
		db.collection('users', function(err, collection){

			var userDetails = {

				username: uname,
				password: pwd
			};

			//insert the variables created above an
			collection.insert(userDetails, {w:1}, function(err, result){
				if (err) throw err;
 
				res.redirect('/');
            });
		});
	}

};

exports.processLogin = function(req, res){
	console.log('hello');
	// bring in db connection
	var db = req.app.settings.db;

	//put input field values into variables
	var uname = req.param('username');
	var pwd = req.param('password');

	var yourName = req.query.username;

	// store the name up on the users session
	req.session.username = yourName;

	if(uname || pwd){
		//locate associated db collection
		db.collection('users', function(err, collection){
			if(err) throw err;

			//find username in the collection
			collection.find({username : uname}).toArray(function (err, arrayOfDocs){
				if(err) throw err;

				if(arrayOfDocs.length == 0){
					console.log('1');
					req.session.loginMsg = "User not found";
					res.redirect('/');
				}
				else{
					if (arrayOfDocs[0].password === pwd){
						console.log('2');
						req.session.user = uname;
						res.redirect('/listDisplay');

					}
					else{
						console.log('3');
						req.session.loginMsg = "wrong password";
						res.redirect('/');
					}
				}
			});
		});
	}	
	else{
	req.session.loginMsg = "both fields required";	
	res.redirect('/');
    }
	
};

