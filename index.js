// var d3 = require('d3')
// var Papa = require('papaparse')
var domready = require('domready')

var Starplot = require('./starplot.js')

domready(function () {
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scale: true})

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
})
