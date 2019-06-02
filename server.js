const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const colors = require('colors')
//const cors = require("cors");

app.use(bodyParser.text());

app.use((req,res,next)=>{
	
	const allowedOrigins = ["http://localhost:4000","https://www.freecodecamp.com"];
	
	const origin = req.headers.origin;
	
	if(!origin || allowedOrigins.indexOf(origin) > -1){
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		
	}else{
		console.log()
		console.log(colors.red("someone from not allowed cross-origin trying to access: \n" +
		req.method + " || " + req.path + " || " + JSON.stringify(req.headers)));
	};
	next();
})

app.use((req,res,next)=>{
	console.log(
		req.method.black.bgWhite + " || " + req.path + " || " + (req.headers.origin || "same-origin")
	);
	next();
})

const assetsPath = __dirname + "/js/";
app.use(express.static(assetsPath));

const htmlPath = __dirname + "/views/index.html";
app.get('/',(req,res)=>{
	res.sendFile(htmlPath);
})

app.post('/',(req,res)=>{
	res.send(req.body)
})

app.get('/api/timestamp/:date_string',(req,res)=>{
	
	const date = new Date(parseInt(req.params.date_string))
	const unix = date.getTime();
	
	console.log("params: ".cyan + req.params.date_string + "\ndate: ".red + date + "\nunix: ".green + unix);
	
	res.send(isNaN(unix)
	? {"error" : "Invalid Date" }
	: {"unix": unix, "utc" : date.toUTCString() });
})
app.get('/api/timestamp/',(req,res)=>{
	console.log("empty string, returns new Date()".magenta.bold)
	res.send(new Date());
})

let port = 3000;
app.listen(port,()=>{
	console.log("Timestamp server is now listening to: " + port);
})