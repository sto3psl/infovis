var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  parsedData = JSON.parse(data)

  fs.readFile('data/trips.txt', {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]
        // console.log(result)

        for (var i = 0; i < parsedData.length; i++) {
          if (result.route_id === parsedData[i].route_id) {
            delete result.route_id
            console.log(result)
            parsedData[i].trip.push(JSON.stringify(result))
          }
        }
      // console.log(parsedData)
      },
      complete: function (results, file) {
        // if (process.argv[2] !== undefined) {
        fs.writeFile(process.argv[2], JSON.stringify(parsedData), function (err) {
          if (err) throw err
          console.log('Baby parsed!')
        })
      // }
      // console.log(parsedData)
      }
    })
  })
})
