var Baby = require('babyparse')
var fs = require('fs')

// Papa.parse('./data/agency.txt', {
//   download: true,
//   header: true,
//   step: function (results, parser) {
//     if (results.data[0].agency_id === '0NV___' ||
//       results.data[0].agency_id === 'VBB') {
//       d3.select('.data').append('p')
//         .html(results.data[0].agency_name)
//     }
//   },
//   complete: function (results) {
//     console.log('complete')
//   }
// })

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err
  // console.log(data)
  var parsed = Baby.parse(data, {
    header: true
  })

  fs.writeFile(process.argv[3], JSON.stringify(parsed), function (err) {
    if (err) throw err
    console.log('Baby parsed!')
  })
})
