var d3 = require('d3')
var Papa = require('papaparse')
var domready = require('domready')

var createStarplot = require('./starplot')

domready(function () {
  // var createSvg = d3.select('main').append('svg')
  //   .attr('width', 100)
  //   .attr('height', 100)
  //   .attr('viewBox', '0 0 100 100')

  var starplot = createStarplot([10, 20, 30, 40, 50])

  // d3.select('svg').append('path')
  //   .style('stroke-width', 3)
  //   .attr('d', 'M50 25 L75 50 L50 75 Z')

  Papa.parse('./data/agency.txt', {
    download: true,
    header: true,
    step: function (results, parser) {
      // console.log(results.data[0])
      if (results.data[0].agency_id === '0NV___' ||
        results.data[0].agency_id === 'VBB') {
        d3.select('.data').append('p')
          .html(results.data[0].agency_name)
      }
    },
    complete: function (results) {
      console.log('complete')
    }
  })

  console.log('hello world')
})
