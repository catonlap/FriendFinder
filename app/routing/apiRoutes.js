var friends = require('../data/friends');
var bodyParser = require('body-parser');

function apiRoutes(app) {
  app.get('/api/friends', function(req,res){
    return res.json(friends);
  });

  // CREATE FRIEND INFO
  app.post('/api/friends', function(req,res){
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    for (var i=0; i < req.body.scores.length; i++) {
      newFriend.scores[i] = parseInt(req.body.scores[i]);
    };

    // ADD ANSWERS TO ARRAY
    var answerDistance = [];
    for (var j=0; j < friends.length; j++) {
      var diff = 0;
      for (var k=0; k < friends[j].scores.length; k++) {
          diff += Math.abs(friends[j].scores[k] - newFriend.scores[k]);
      };
      answerDistance.push(diff);
    };

    var matchIndex = answerDistance.indexOf(Math.min(...answerDistance));
    var match = friends[matchIndex];
    // ADD FRIEND TO ARRAY
    friends.push(newFriend);
    // RETURN CLOSEST MATCH
    return res.json(match);
  });
};

module.exports = apiRoutes;
