var Baby = require('babyparse')
var fs = require('fs')
var uniq = require('array-uniq')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  parsedData = JSON.parse(data)
  for (var i = 0; i < parsedData.length; i++) {
    parsedData[i].routes = []
  }
  // console.log(parsedData.length)

  fs.readFile(process.argv[3], {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]

        for (var i = 0; i < parsedData.length; i++) {
          if (parsedData[i].stop_id === result.stop_id) {
            parsedData[i].routes = uniq(parsedData[i].routes)
            parsedData[i].routes.push(result.route_id)
          }
        }
      },
      complete: function (result, file) {
        // console.log(par)
      }
    })
    console.log(parsedData)
  })
})
