  var path = require('path');
  var jsf = require('json-schema-faker');
  var refaker = require('refaker');
  var faker = require('faker/locale/en');
  fs = require('fs');


  var schemasDirPath = path.join(__dirname, 'schemas');
  var schemaPath = path.join(__dirname, 'schemas', 'GRN.json');
  var schema = require(schemaPath);
  var args = process.argv.slice(2);

  jsf.extend('faker', function() {
      // just ignore the passed faker instance
        var faker = require('faker/locale/en');
        return faker;
  });

  refaker({
            schema: schema,
            fakeroot: 'http://example.com',
            directory: schemasDirPath
          }, function(err, refs, schemas) {
                      if(err) {
                                throw err;
          }
          
          var numberOfFiles = 1;
          if(Number.isInteger(parseInt(args[0]))){
              numberOfFiles = args[0];
          }
          console.log("Generating "+numberOfFiles + "files");
          for(var i = 0; i< numberOfFiles; i++){
              jsf(schemas, refs).then(function(sample) {
              
                var dir = './output';

                if (!fs.existsSync(dir)){
                                          fs.mkdirSync(dir);
                }
                fs.writeFile("./output/"+faker.random.number({min:10000, max:10000000})+".json", JSON.stringify(sample, null, 2), function(err) {
                  if(err) {
                          return console.log(err);
                  }
                  console.log("The file was saved!");
                });
              });
          }
  });
