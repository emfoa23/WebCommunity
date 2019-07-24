const express = require('express');
const app = express();
const port = 4000;

app.get("/", function(req, res){
	res.send("Hello Node!");
});

app.listen(port, '0.0.0.0', function(err){
	if (err) {
		console.log("error!");
	}
	else {
		console.log("app listening");
	}
});
