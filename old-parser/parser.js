var Baby = require('babyparse')
var fs = require('fs')

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err
  // console.log(data)

  var parsedData = []
  Baby.parse(data, {
    header: true,
    step: function (results, parser) {
      var result = results.data[0]
      // console.log(result.route_id)

      result.agency = {}
      result.agency.id = result.agency_id

      delete result.agency_id

      result.trip = []
      parsedData.push(result)
    // console.log(parsedData)
    },
    complete: function (results, file) {
      if (process.argv[3] !== undefined) {
        fs.writeFile(process.argv[3], JSON.stringify(parsedData), function (err) {
          if (err) throw err
          console.log('Baby parsed!')
        })
      }
    }
  })
})
