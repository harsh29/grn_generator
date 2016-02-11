var path = require('path');
var refaker = require('refaker');

var schemasDirPath = path.join(__dirname, 'schemas');
var schemaPath = path.join(__dirname, 'schemas', 'user.json');
var schema = require(schemaPath);

refaker({
  schema: schema,
  fakeroot: 'http://example.com',
  directory: schemasDirPath
}, function(err, refs, schemas) {
  if(err) {
    throw err;
  }

  console.log('refs:', refs);
  console.log('schemas:', JSON.stringify(schemas, null, 2));
  
});
