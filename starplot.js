var d3 = require('d3')

var dataSetCount = 0

function Starplot (data, e) {
  this.data = []
  this.svgContainer = null

  this.draw(e)
  this.drawAxes(data)
  this.addDataSet(data)
}

Starplot.prototype.draw = function (e) {
  this.svgContainer = d3.select(e).append('div')
    .attr('class', 'plot')
    .append('svg')
    .attr('viewBox', '-100 -110 200 200')

  return Starplot
}

Starplot.prototype.drawAxes = function (data) {
  var i = 0

  this.svgContainer.insert('g', 'path').attr('class', 'axes').selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 100)
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

Starplot.prototype.addAxisScale = function (accuracy) {
  var data = this.data[1]
  console.log('add Axis Scale')

  for (var i in data) {
    var g = this.svgContainer.append('g')
      .attr('class', 'scale-' + i)

    for (var j = 0; j < 10; j++) {
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', -10 * j)
        .attr('r', 0.75)
    }

    this.svgContainer.select('.scale-' + i)
      .attr('transform', function () {
        return 'rotate(' + (360 / data.length) * i + ')'
      })
  }

  // for (var j = 0; j < data.length; j++) {
  //   var group = this.svgContainer.select('g').append('g')
  //     .attr('class', 'scale-' + j)
  //     .attr('transform', function () {
  //       return 'rotate(' + (360 / data.length) * j + ')'
  //     })

//   for (var i = 1; i < accuracy; i++) {
//     group.append('circle')
//       .attr('cx', 0)
//       .attr('cy', -i * 50 / accuracy)
//       .attr('r', 0.75)
//   }
// }
}

Starplot.prototype.addDataSet = function (d) {
  this.data.push(d)
  var data = d
  dataSetCount++

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

  var lineFunction = d3.svg.line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) {
      return d.y
    })
    .interpolate('linear')

  this.svgContainer.append('path')
    .attr('class', 'data-set-' + dataSetCount)
    .attr('d', lineFunction(lineData) + 'Z')

  return Starplot
}

Starplot.prototype.removeDataSet = function (dataSet) {
  d3.select('.data-set-' + dataSet).remove()

  return Starplot
}

module.exports = Starplot
