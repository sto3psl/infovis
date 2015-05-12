var View = require('ampersand-view')
var template = require('../templates/app.jade')

// make this the general app view
var app = View.extend({
  template: template,
  events: {

  },
  bindings: {
    'model.name': {
      type: 'text',
      hook: 'name'
    }
  },
  render: function () {
    this.renderWithTemplate()

    return this
  }
})

module.exports = app
