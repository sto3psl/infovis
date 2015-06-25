var Baby = require('babyparse')
var fs = require('fs')

var parsedData = []

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err

  console.log('[')

  Baby.parse(data, {
    header: true,
    step: function (results, parser) {
      var result = results.data[0]
      result.route = []
      console.log(JSON.stringify(result) + ',')

      // fs.appendFile(process.argv[3], result, {'encoding': 'utf-8'}, function (err) {
      //   if (err) throw err
      //   console.log(result)
      // })

    }
  })

  console.log('{}]')
})
