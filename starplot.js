var d3 = require('d3')

function Starplot (data, e) {
  this.data = []
  this.svgContainer = null
  this.dataSetCount = 0

  this.draw(e)
  this.drawAxes(data)
  this.addDataSet(data, true)
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

Starplot.prototype.addAxisScale = function () {
  var data = this.data[1]
  console.log('add Axis Scale')

  for (var i = 0; i < 10; i++) {
    this.addDataSet([10 * i, 10 * i, 10 * i, 10 * i, 10 * i], false)

  }
}

Starplot.prototype.addDataSet = function (d, push) {
  if (push === undefined) {
    push = true
  }
  if (push) {
    this.data.push(d)
  }
  var data = d
  this.dataSetCount++
  var count = this.dataSetCount

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
    .attr('class', function () {
      if (push) {
        return 'data-set-' + count
      } else {
        return 'scale'
      }
    })
    .attr('d', lineFunction(lineData) + 'Z')

  return Starplot
}

Starplot.prototype.removeDataSet = function (dataSet) {
  d3.select('.data-set-' + dataSet).remove()

  return Starplot
}

module.exports = Starplot
