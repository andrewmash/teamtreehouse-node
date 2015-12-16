function get(username) {
  var http = require("http");
  var https = require("https");
  
  // Print out message
  function printMessage(username, badgeCount, points) {
    var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
  }
  
  // Print out error messages
  function printError(error) {
    console.error(error.message);
  }
  
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    // Read the data
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() {
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          // Parse error
          printError(error);
        }
      } else {
        // Status code error
        printError({message: "There was an error getting the profile for " + username +". (" + 
                   http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
    // Parse the data
    // Print the data
  
  });
  
  // Connection error
  request.on("error", printError);
}

module.exports.get = get;









