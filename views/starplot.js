var View = require('ampersand-view')
var d3 = require('d3')
var template = require('../templates/routes.jade')

// make this the general app view
var routes = View.extend({
  template: template,
  events: {
    'click button': 'draw'
  },
  initialize: function () {
    this.renderWithTemplate()
    console.log('hello')
  },
  draw: function () {
    var svg = d3.select('svg')
    svg.append('circle')
      .attr('cx', 20)
      .attr('cy', 20)
      .attr('r', 10)
    console.log('hi')
  }
})

module.exports = routes
