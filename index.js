//powered by NewsAPI.org

var express = require("express");
var request = require("request");
var app = express();
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


//example ?source=the-next-web&sortBy=latest&apiKey=507a41fc68104d1484c8eabdefffce42

app.post('/',function(req,res){
   res.send(req);
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


app.get('/', function(req,res){
    return new Promise(function(resolve, reject){
        var category = "business"; // this is the input from api.ai
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
                var sourceId = getSourceId(data);
                var randNumber = Math.round(Math.random()*sourceId.length);
                //console.log(newsArticle+sourceMethod+sourceId[randNumber]);
                request.get(newsArticle+sourceMethod+sourceId[randNumber],function(error, response, data){
                    if (!error && response.statusCode == 200){
                        data = JSON.parse(data);
                        //console.log(data);
                        //console.log(data.articles[0].description);
                        
                        
                        res.send(data.articles[0].description);
                        res.end();
                    }else{
                        console.log(response);
                        console.log(error);
                        throw error;
                    }
                    
                    
                })   ;      
                 
                
             }else{
                 console.log(error);
                 throw error;
             }
             
        })
        
        
    });
    
    

       
});


app.listen(process.env.PORT, function(){
    console.log("Server listening on: "+ process.env.PORT);
});