var d3 = require('d3')
var Papa = require('papaparse')
var domready = require('domready')

var createStarplot = require('./starplot')

domready(function () {
  // var createSvg = d3.select('main').append('svg')
  //   .attr('width', 100)
  //   .attr('height', 100)
  //   .attr('viewBox', '0 0 100 100')

  for (var i = 0; i < 5; i++) {
    createStarplot([1, 2, 3, 4]).append('circle')
      .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 50)
  }

  Papa.parse('./data/routes.txt', {
    download: true,
    header: true,
    complete: function (results) {
      console.log(results)
      return results
    }
  })

  console.log('hello world')
})
