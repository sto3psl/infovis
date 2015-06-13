var d3 = require('d3')

var svgContainer = null
var data = []

var i = 0

// Constructor - Draws empty SVG element
function Starplot (parent) {
  svgContainer = d3.select(parent).append('div')
    .attr('class', 'plot')
    .append('svg')
    .attr('viewBox', '-50 -55 100 100')

  return Starplot
}

Starplot.test = function () {
  console.log('test')
  return Starplot
}

// Draw Axes according to number of data elements
Starplot.drawAxes = function () {
  svgContainer.selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 50)
    .attr('y2', 0)
    .attr('transform', function (d) {
      var deg = -90 + (360 / (data.length)) * i
      i++
      return ('rotate(' + deg + ')')
    })
    .attr('class', function (d) {
      return 'line-' + data.indexOf(d)
    })

  return Starplot
}

// Add Datasets to Starplot
Starplot.addDataSet = function (d) {
  data = d
  console.log(data)

  var dataConvert = function () {
    var results = []

    for (var i = 0; i < data.length; i++) {
      var coords = {}

      coords.x = 0 - data[i] * Math.cos((90 + (360 / data.length) * i) / 180 * Math.PI)
      coords.y = 0 - data[i] * Math.sin((90 + (360 / data.length) * i) / 180 * Math.PI)

      results[i] = coords
    }
    return results
  }

  var lineData = dataConvert()
  console.log(lineData)

  var lineFunction = d3.svg.line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) {
      return d.y
    })
    .interpolate('linear')

  svgContainer.append('path')
    .attr('d', lineFunction(lineData) + 'Z')

  return Starplot
}

module.exports = Starplot
