var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err
  // console.log(data)

  Baby.parse(data, {
    header: true,
    step: function (results, parser) {
      var result = results.data[0]
      result.route = []
      result.trip = []
      console.log(result)
      parsedData.push(result)
    },
    complete: function (results, file) {
      // if (process.argv[3] !== undefined) {
      fs.writeFile(process.argv[3], JSON.stringify(parsedData), function (err) {
        if (err) throw err
        console.log('Baby parsed!')
      })
      console.log(parsedData[0])
    // }
    }
  })
})
