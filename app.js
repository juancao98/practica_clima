var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var Forecastlo =require("forecastio");

var app = express();

//aqui va la llave
var weather = new Forecastlo("4bd43ff7861648f7438fae77fdd6ec96");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
});

app.get(/^\/(\d{5})$/,function(req,rexs,next){
    var zipcode = req.params[0];
    var location = zipbd.zipcode(zipcode);
    if(!location.zipcode){
        next();
        return;
    }

    var latitude =local.latitude;
    var longitude=local.longitude;

    weather.forecast(latitude,longitude,function(err,data){
        if(err){
            next();
            return;
        }
        res.json({
            zipcode:zipcode,
            temperature:data.currently.temperature
        });
    });
});

app.use(function(req,res){
    res.status(404).render("404");
});
app.listen(3000);
