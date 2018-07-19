var express =  require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var parser = require('body-parser');
var fs = require('fs');

var passport = require('passport');


router.use(parser.json());

router.get('/', function(req, res, next) {
	console.log(req.user);
	console.log(req.isAuthenticated());
  	res.render('index.hbs', { title: 'Hospital Management' });
});

router.get('/login', function (req, res, next) {
	res.render('login.hbs', {title: 'Log In form'})
});	

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) return next(err);
		if (!user) { 
			req.session.message = info;
      		return res.redirect('/login'); 
      	}
		req.logIn(user, function(err) {
			if (err) return next(err);
			return res.redirect('/');
	});
})(req, res, next);
});

router.get('/logout' , function(req, res) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/register', function (req, res, next) {
	res.render('register.hbs', {title: 'Registration form'})
});	

router.post('/register', function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	const db = require('../dbconfig.js');

	bcrypt.hash(password, saltRounds, function(err, hash) {
		query = db.query('INSERT INTO users (username, password) VALUES (?, ?)',[username, hash], function (err, result, fields) {
			if (err) {
				// console.log(err);
				if (err.code === "ER_DUP_ENTRY") res.send({
					redirectTo: '/',
					msg : 'User Already Exists'
				});
				var str = JSON.stringify(err);
				console.log(str)
			}
			// } else {
			// 	if(!req.user)
			// 		db.query('SELECT * FROM users ORDER BY username DESC LIMIT 1', function(err, results, fields) {
			// 		if (err) throw err;
					
			// 		var user = results[0].username;
			// 		req.login(user, function (err) {
			// 			if (err) console.log(err);
			// 			res.send({
			// 				redirectTo: '/',
			// 				msg: 'User Registerd Successfully'
			// 			});
			// 		});

			// 	});
			// }
		});
	});
});

router.get('/viewPatients', function (req, res) {
	res.render('viewPatients', {title : "View patients Patients"});
});

router.get('/addPatient', function (req, res) {
	res.render('addPatient', {title : "Adding Patients"});
});

router.post('/addPatient', function (req, res) {
	console.log(req.body);
	var d = new Date();
	var date = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
	var patient = [
		req.body.pname,
		req.body.pgender,
		req.body.page,
		date
	];

	const db = require('../dbconfig.js');

	query = db.query('INSERT INTO patients (pname, pgender, page, regDate) values (?, ?,? , ?)',patient, function (err, results, fields) {
		if (err) {
			console.log(err);
			res.send('Error Inserting Patient');
		} else {
			res.send({msg : 'Patient registerd sucessfully', redirectTo : '/addPatient'});
		}
	})

});

router.get('/patients', function (req, res) {
	const db = require('../dbconfig.js');
	query = db.query("SELECT pid, pname, pgender, page , date_format(regDate,'%d-%b-%Y') AS regDate FROM PATIENTS", function(err, results) {
		var str = JSON.stringify(results);
		var patients = JSON.parse(str);
		res.json(patients);
	});
});

passport.serializeUser(function(user, done) {
	console.log("ser")
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log("deser - " + user)
    done(null, user);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}


module.exports = router;