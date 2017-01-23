var mocha = require("mocha");
var expect = require("chai").expect;
var app = require("../getNews")

describe("Respond with type of news", function(){
    it("Responds with Insurance news", function(){
        var input = "insurance";
        var expected = input;
        app.getNewsType(input).then(function(actual){
            expect(actual).to.eql(expected);    
        });
        
    });
    
    it("Responds with don't have this type of news", function() {
        var input = "blah blah blah";
        var expected = "something else";
        var actual = app.getNewsType(input);
        expect(actual).to.eql(expected);
    });
    
    it("Responds with thought of the day", function() {
        var input = "thought";
        var expected = "thought of the day";
        app.getNewsType(input).then(function(actual){
            expect(actual).to.eql(expected);    
        });
    });
});