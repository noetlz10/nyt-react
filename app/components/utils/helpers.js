var axios = require("axios");

//NYT API key
var nytAPI= "3c1b31b8bc8e4acca17525357fc05ab1";

var helper = {
  runQuery: function(topic, startYear, endYear) {
    console.log("SEARCHING FOR " + topic);
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q="+ topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "3000";
    return axios.get(queryURL).then(function(response) {
      var results = [];
      // If get a result, return that result's formatted address property
      if (response.data.results[0]) {
        for(var i = 0; i<5; i++){
          results.push(response.data.results[i].formatted);
        }
        console.log(results);
        return results;
      } else{
        // If we don't get any results, return an empty string
        return "No articles found.";
      }
    });
  },
  getSaved: function(){
    return axios.get('/api/saved');
  },

  postSaved: function(article){
    return axios.post('/api/saved', {article: article});
  },

  deleteSaved: function(id){
     return axios.delete('/api/saved/' + id); 
  }
};

module.exports = helper;
