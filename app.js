const express = require('express');
const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("index.html");
});

app.listen(port, '0.0.0.0', function(err){
	if (err) {
		console.log("error!");
	}
	else {
		console.log("app listening");
	}
});