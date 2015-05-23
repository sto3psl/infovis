var d3 = require('d3')
var Victor = require('victor')

var Starplot = function (data) {
  var svgContainer = d3.select('main').append('svg').attr('viewBox', '0 0 100 100')
  // console.log(data)

  svgContainer.selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('x1', 50)
    .attr('y1', 50)
    .attr('x2', 50)
    .attr('y2', 0)
    .style('transform', function (d) {
      var deg = (360 / (data.length)) * data.indexOf(d)
      // console.log(deg)
      return ('rotate(' + deg + 'deg)')
    })
    .attr('class', function (d) {
      return 'line-' + data.indexOf(d)
    })
    .attr('stroke-width', '1px')

  var origin = new Victor(50, 50)
  // var coords = new Victor(0, -10).rotateByDeg(90 + (360 / 5 * 4))
  // console.log(coords.toObject())
  // var point = origin.add(coords)
  // console.log(coords.angleDeg())

  var dataConvert = function () {
    var results = []
    for (var i = 0; i < data.length; i++) {
      var coords = new Victor(0, -20).rotateByDeg(90 + (360 / data.length) * i)
      results[i] = origin.add(coords).toObject()
      console.log(results[i])
    }
    console.log(results)
    return results
  }

  var lineData = dataConvert()

  // This is the accessor function we talked about above
  var lineFunction = d3.svg.line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) { return d.y })
    .interpolate('linear')

  // The line SVG Path we draw
  svgContainer.append('path')
    .attr('d', lineFunction(lineData) + 'Z')

  return true
}

module.exports = Starplot
