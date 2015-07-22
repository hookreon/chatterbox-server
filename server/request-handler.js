// var headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, // Seconds.
//   "Content-Type": "application/json"
// };


// var sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data));
// };

// var collectData = function(request, callback) {
//   var data = '';
//   request.on('data', function(chunk) {
//     data += chunk;
//   });
//   request.on('end', function() {
//     callback(JSON.parse(data));
//   });
// };
var utils = require('./utils')

var objectId = 1;
var messages = [
  {
    username: 'gilligan',
    text: 'hoho',
    objectId: objectId
  }
];

var actions = {
  "GET": function(request, response) {
    utils.sendResponse(response, {results: messages});
  },
  "POST": function(request, response) {
    utils.collectData(request, function(message) {
      messages.push(message);
      message.objectId = ++objectId;
      utils.sendResponse(response, message.objectId);
    })
  },
  "OPTIONS": function(request, response) {
    utils.sendResponse(response, null);
  }
}

exports.requestHandler = function(request, response) {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404)
  }

};


