var View = require('ampersand-view')
var template = require('../templates/routes.jade')

// make this the general app view
var routes = View.extend({
  template: template,
  initialize: function () {
    console.log(this.collection)
  }
})

module.exports = routes
