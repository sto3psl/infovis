var d3 = require('d3')
var Papa = require('papaparse')
var domready = require('domready')

var createStarplot = require('./starplot')

domready(function () {
  createStarplot('Berlin Hbf.', [30, 20, 40, 20, 10], true, true)
  createStarplot('Potsdamer Platz', [30, 20, 30, 20, 10], true)
  createStarplot('Dresden Hbf.', [30, 20, 40, 20, 10, 35, 26, 40, 25], true)
  createStarplot('Dresden Neustadt', [45, 20, 23, 20, 5], true)
  createStarplot('Moskau', [12, 2, 45, 20, 43], true)

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
