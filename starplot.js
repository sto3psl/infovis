var d3 = require('d3')
var Victor = require('victor')

var i = 0

var Starplot = function (headline, data, showAxes, main) {
  // Erstellen des SVG-Element in dem der Starplot gezeichnet wird
  var svgContainer = d3.select('main').append('div')
    .html('<p>' + headline + '</p>')
    .attr('class', 'plot')
    .classed({'main': main})
    .append('svg')
    .attr('viewBox', '-60 -60 120 120')

  // Abfrage ob die Achsen eines Starplot angezeigt werden sollen
  if (showAxes) {
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
      // .attr('-webkit-transform', function (d) {
      //   var deg = -90 + (360 / (data.length)) * i
      //   i++
      //   return ('rotate(' + deg + 'deg)')
      // })
      .attr('class', function (d) {
        return 'line-' + data.indexOf(d)
      })
  }

  // Berechnet die Lage der Punkte für den Pfad
  var dataConvert = function () {
    var results = []
    for (var i = 0; i < data.length; i++) {
      var coords = new Victor(0, data[i]).rotateByDeg(90 + (360 / data.length) * i)
      results[i] = coords.toObject()
    // console.log(results[i])
    }
    return results
  }

  var lineData = dataConvert()
  console.log(lineData)

  // Werte an die Achsen schreiben
  svgContainer.selectAll('text')
    .data(lineData)
    .enter().append('text')
    .attr('x', function (d) {
      return d.x
    })
    .attr('y', function (d) {
      return d.y
    })
    .text(function (d) {
      return Math.abs(d3.round(d.y, 0))
    })

  // Zeichnen des Pfades
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

  return true
}

module.exports = Starplot
