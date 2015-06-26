var Baby = require('babyparse')
var fs = require('fs')

// Einlesen der CSV-Datei welche in JSON konvertiert werden soll
fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  console.log('[')

  Baby.parse(data, {
    header: true,
    step: function (results, parser) {
      var result = results.data[0]
      // result.route = []
      // result.trips = 0
      console.log(JSON.stringify(result) + ',')
    }
  })
  console.log('{}]')
})
