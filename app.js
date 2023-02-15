const express=require("express");
 const https=require("https"); 
 const bodyparser =require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
 });

app.post("/",function(req,res){

const query=req.body.cityName;
const apikey="370d0191419882d5267855fdacf62d48";
const unit="metric"

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p>The Weather is Currently " + weatherDescription +"</p>");
        res.write("<h1>The Temprature in "+query+" is " + temp +" degree Celcius .<h1>");
        res.write("<img src=" +imageURL+">");
        res.send();
    })

});
})
app.listen(3000,function(){
    console.log("server is up and running on port 3000");
}) 
// https://github.com/Anveshmishra02/existingProject.git