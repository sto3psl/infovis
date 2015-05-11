var domready = require('domready')

var App = require('./views/app')

domready(function () {
  var self = this

  self.view = new App({ el: document.body })
  self.view.render()
})
