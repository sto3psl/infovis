var View = require('ampersand-view')
var template = require('../templates/app.jade')

var StarPlot = require('./starplot')

// make this the general app view
var app = View.extend({
  template: template,
  events: {

  },
  initialize: function () {
    this.listenTo(this.collection, 'reset', this.render)
    console.log(this.collection)
  },
  render: function () {
    this.renderWithTemplate()

    this.renderSubview(new StarPlot({ collection: this.collection}))
    return this
  }
})

module.exports = app
