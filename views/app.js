var View = require('ampersand-view')
var template = require('../templates/app.jade')

// make this the general app view
var app = View.extend({
  template: template,
  events: {

  },
  initialize: function () {
    this.listenTo(this.collection, 'reset', this.render)
  }
})

module.exports = app
