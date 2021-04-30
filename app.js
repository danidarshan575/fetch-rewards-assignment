var express = require("express");
var routes = require("./routes/routes.js");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

routes(app);

var server = app.listen(3000, () => {

    console.log("App running on port: ", server.address().port);
});

module.exports = server;