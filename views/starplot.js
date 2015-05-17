var View = require('ampersand-view')
var d3 = require('d3')
var template = require('../templates/starplot.jade')

// make this the general app view
var Starplot = View.extend({
  template: template,
  events: {
    'click button': 'draw'
  },
  draw: function () {
    var svg = d3.select(this.query('svg'))
    svg.selectAll('circle')
      .data(['hello'])
      .enter().append('circle')
      .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 25)

    svg.append('line')
      .attr('x1', 50)
      .attr('y1', 50)
      .attr('x2', 50)
      .attr('y2', 25)
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '5, 5')
      .attr('stroke-width', 1)

    svg.selectAll('text')
      .data(['hallo'])
      .enter().append('text')
      .attr('x', 50)
      .attr('y', 25 - 3)
      .text(function (d) {return d})
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'red')

    console.log('hi')
  },
  render: function () {
    this.renderWithTemplate(this)
    this.draw()
    return this
  }
})

module.exports = Starplot
