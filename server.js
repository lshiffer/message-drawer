var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

//  Public directory
app.use(express.static(path.resolve('public')));

app.use(bodyParser.urlencoded({
  extended: true,
}));

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

//  Send the enhancement as a standalone page
app.get('/canvas', function(req, res) {
	res.sendFile(path.resolve('enhancement/canvas.html'));
});

//  Receive the enhancement
app.post('/api/canvas', cors(corsOptions), require('./api/canvasResolver'));

// Start the server
if (process.env.NODE_ENV === 'production') 
	app.listen(process.env.PORT || 8910);
else {
	var pem = require('pem');
	var https = require('https');

	pem.createCertificate({days: 1, selfSigned: true}, function(err, keys) {
		if (err)
			throw err;

		https.createServer({
			key: keys.serviceKey,
			cert: keys.certificate
		}, app).listen(process.env.PORT || 8910);
	});
}
