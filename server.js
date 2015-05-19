var express = require('express');
var app = express();
var email = require('emailjs');
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.set('port', (process.env.PORT || 5000));

var mailserver  = email.server.connect({
   user:    "repurposemailer@gmail.com", 
   password:"wordofpassing", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

app.post('/mail', function (req, res) {
	mailserver.send({
		text:    req.body.msg, 
		from:    req.body.name + " <" + req.body.email + ">", 
		to:      "<repurpose@repurposenetwork.com>",
		subject: "Message from landing page: " + req.body.name + " <" + req.body.email + ">"
	}, function(err, message) {
		console.log(err || message);
		if (err) res.status(500).send({error: "Error sending mail."});
		else res.send("OK");
	});
});

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});