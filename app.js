//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  //to get the data from the input that has the name cityName with the body-parser : req.body.cityName

  //callin the API
  const query = req.body.cityName;
  const appId = "f89cc8f99de19747338e0a8bb68d1e38";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=" + unit;

  // Make HTTP Request using https standard library to get the data from the API
  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {
      //Parsing the data received
      const weatherData = JSON.parse(data);
      //Fetching the specific items that we want
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      //sendeng back to the browser
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<img src=" + icon + ">");
      res.send();
    });
  });

  //reponse de Get à afficher à la page d'acceuil
  // res.send("server is running");

});



app.listen(3000, function() {
  console.log("server is running on port 3000");
});
