var d3 = require('d3')

var Starplot = function (data) {
  var svg = d3.select('main').append('svg').attr('viewBox', '0 0 100 100')
  console.log(data)

  svg.selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('x1', 50)
    .attr('y1', 50)
    .attr('x2', 50)
    .attr('y2', 0)
    .style('transform', function (d) {
      var deg = (360 / (data.length)) * data.indexOf(d)
      console.log(deg)
      return ('rotate(' + deg + 'deg)')
    })
    .attr('class', function (d) {
      return 'line-' + data.indexOf(d)
    })
    .attr('stroke-width', '1px')

  return true
}

module.exports = Starplot
