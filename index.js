var path = require('path');
var jsf = require('json-schema-faker');
var refaker = require('refaker');

var schemasDirPath = path.join(__dirname, 'schemas');
var schemaPath = path.join(__dirname, 'schemas', 'GRN.json');
var schema = require(schemaPath);

refaker({
  schema: schema,
  fakeroot: 'http://example.com',
  directory: schemasDirPath
}, function(err, refs, schemas) {
  if(err) {
    throw err;
  }

  console.log('refs:', JSON.stringify(refs, null, 2));
  console.log('schemas:', JSON.stringify(schemas, null, 2));
  
  var sample = jsf(schemas, refs);

  console.log('---------');
  console.log('---------');

  console.log('sample:', JSON.stringify(sample, null, 2));
});
