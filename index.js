// var d3 = require('d3')
// var Papa = require('papaparse')
var domready = require('domready')

var createStarplot = require('./starplot')
var Starplot = require('./starplot-new.js')

domready(function () {
  createStarplot('Berlin Hbf.', [30, 20, 40, 20, 10], true, true)
  var a = new Starplot('main').addDataSet([30, 20, 40, 20, 10]).drawAxes()

  console.log(a)
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
