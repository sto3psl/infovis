var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {

  parsedData = JSON.parse(data)

  fs.readFile('data/' + process.argv[3] + '.txt', {'encoding': 'utf-8'}, function (err, data) {
    if (err) throw err

    Baby.parse(data, {
      header: true,
      step: function (results, parser) {
        var result = results.data[0]

        for (var i = 0; i < parsedData.length; i++) {
          if (parsedData[i].agency.id === result.agency_id) {
            parsedData[i].agency.name = result.agency_name
          }
        }
        console.log(parsedData)
      },
      complete: function (results, file) {
      if (process.argv[2] !== undefined) {
        fs.writeFile(process.argv[2], JSON.stringify(parsedData), function (err) {
          if (err) throw err
          console.log('Baby parsed!')
        })
      }
    }
    })
  })
})

