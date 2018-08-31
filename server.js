var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// EXPRESS
var app = express();
var PORT = process.env.PORT || 3000;

// PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// IMPORT
var htmlRoutes = require('./app/routing/htmlRoutes.js');
var apiRoutes = require('./app/routing/apiRoutes.js');

app.use(express.static('app/public'));
apiRoutes(app);
htmlRoutes(app);

// PORT
app.listen(PORT, function(){
  console.log(`App listening on PORT ${PORT}`);
});