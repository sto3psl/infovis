var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  parsedData = JSON.parse(data)

  fs.readFile('../data/routes.txt', {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]

        for (var i = 0; i < parsedData.length; i++) {
          if (result.agency_id === parsedData[i].agency_id) {
            delete result.agency_id
            result.stops = []
            result.trips = []
            parsedData[i].route.push(result)
          }
        }
      },
      complete: function (results, file) {
        fs.writeFile(process.argv[2], JSON.stringify(parsedData), function (err) {
          if (err) throw err
          console.log('Baby parsed!')
        })
      // console.log(parsedData)
      }
    })
  })
})
