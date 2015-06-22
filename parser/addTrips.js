var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  parsedData = JSON.parse(data)

  fs.readFile('../data/trips.txt', {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]
        delete result.trip_headsign
        // console.log(result)

        for (var i = 0; i < parsedData.length; i++) {
          for (var j = 0; j < parsedData[i].route.length; j++) {
            if (parsedData[i].route[j].route_id === result.route_id) {
              parsedData[i].route[j].trips.push({'trip_id': result.trip_id})
            }
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
