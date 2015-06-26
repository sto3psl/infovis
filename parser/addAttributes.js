var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  parsedData = JSON.parse(data)

  fs.readFile(process.argv[3], {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]
        // console.log(result)

        for (var i = 0; i < parsedData.length; i++) {
          // Code um Linien zu Haltestellen zuzuordnen
          // if (parsedData[i].stop_id === result.stop_id) {
          //   parsedData[i].route.push(result.route_id)
          //   console.log(JSON.stringify(parsedData[i]) + ',')
          // }

          // Code um Anzahl Trips in Routes.json zu ermitteln
          if (parsedData[i].route_id === result.route_id) {
            parsedData[i].trips++
          }
        }
      },
      complete: function (result, file) {
        console.log(JSON.stringify(parsedData))
      }
    })
  })
})
