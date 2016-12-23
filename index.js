//powered by NewsAPI.org

var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
const newsApiKey = process.env.newsApiKey;
const newsSource = "https://newsapi.org/v1/sources?apiKey="+newsApiKey+"&language=en&country=us&";
const categoryMethod = "category=";

const newsArticle = "https://newsapi.org/v1/articles?apiKey="+newsApiKey+"&sortBy=top&";
const sourceMethod = "source=";

//pointless
function endIt(res, data){
    return function(){
        console.log(data);
        res.send(data);
        res.end();
    };
}

app.use(bodyParser.json()); // for parsing application/json

//example ?source=the-next-web&sortBy=latest&apiKey=507a41fc68104d1484c8eabdefffce42

function orderNews(categoryVal){
    return new Promise(function(resolve, reject){
        var category = categoryVal; // this is the input from api.ai
        request.get(newsSource+categoryMethod+category, function(error, response, data){
            if (!error && response.statusCode == 200){
                data = JSON.parse(data);
                //console.log(data.sources.length);
                var getSourceId = function(data){
                    var sourceId = [];
                    for (var i =0; i<data.sources.length; i++){
                        sourceId.push(data.sources[i].id);
                    }
                    return sourceId;
                };
                //end of getting the sourceID to get the article data
                var sourceId = getSourceId(data);
                var randNumber = Math.round(Math.random()*sourceId.length);
                //console.log(newsArticle+sourceMethod+sourceId[randNumber]);
                request.get(newsArticle+sourceMethod+sourceId[randNumber],function(error, response, data){
                    if (!error && response.statusCode == 200){
                        data = JSON.parse(data);
                        console.log(data);
                        resolve(data);
                        //console.log(data.articles[0].description);
                        //do other things here with the article dataset            
                    }else{
                        console.log(response);
                        console.log(error);
                        reject(error);
                    }
                //end of getting article data      
                });      
            //end of getting overall data        
            }else{
               console.log(error);
               reject(error);
            }
        });
    });
}



app.route('/')
    .get(function(req,res){
        res.send('get info');
        res.end();
    })
    
    .post(upload.array(),function(req,res){
        console.log(req.body);
        var output =   {
            "speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
            "displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
            "data": {},
            "contextOut": [],
            "source": "DuckDuckGo"
            }
       
       res.json(req.body);
       res.end();
       
       
       /*
       {
        "speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
        "displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
        "data": {...},
        "contextOut": [...],
        "source": "DuckDuckGo"
        }
        */
    });
            


app.listen(process.env.PORT, function(){
    console.log("Server listening on: "+ process.env.PORT);
});