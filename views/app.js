var View = require('ampersand-view')
var template = require('../templates/app.jade')

var test = "hello"
// make this the general app view
var app = View.extend({
  template: template,
  events: {

  },
  bindings: {
    'test': {
      type: 'text',
      hook: 'test'
    }
  },
  render: function () {
    this.renderWithTemplate()

    return this
  }
})

module.exports = app
