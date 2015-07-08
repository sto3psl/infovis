var d3 = require('d3')

function Starplot (data) {
  this.data = []
  this.label = data.label
  this.selector = data.selector
  this.width = 200
  this.height = 200
  this.centerX = -100
  this.centerY = -105

  if (data.selector === '.small-plots') {
    this.centerY = -100
  }

  this.svgContainer = null
  this.dataSetCount = 0

  this.draw(data.selector)
  if (data.selector !== '.small-plots') {
    this.drawAxes(data.data)
    this.addAxisScale()
  }
  this.addDataSet(data.data, true)
  this.addLabel(this.label)
}

Starplot.prototype.draw = function (e) {
  this.svgContainer = d3.select(e).append('div')
    .attr('class', 'star-plot')
    .append('svg')
    .attr('viewBox', this.centerX + ' ' + this.centerY + ' ' + this.width + ' ' + this.height)

  return Starplot
}

Starplot.prototype.addLabel = function (label) {
  if (label !== '') {
    this.svgContainer.append('text')
      .attr('x', 0)
      .attr('y', 80)
      .attr('text-anchor', 'middle')
      .text(function () {
        return label
      })
  }

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
    this.dataSetCount++
    push = true
  }
  if (push) {
    this.data.push(d)
  }
  var count = this.dataSetCount

  var dataConvert = function (d) {
    var results = []
    var data = d

    for (var i = 0; i < data.length; i++) {
      var coords = {}

      coords.x = 0 - data[i] * Math.cos((90 + (360 / data.length) * i) / 180 * Math.PI)
      coords.y = 0 - data[i] * Math.sin((90 + (360 / data.length) * i) / 180 * Math.PI)

      results[i] = coords
    }
    return results
  }

  var lineData = dataConvert(d)

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
