var domready = require('domready')
var parseCSV = require('./parser')

var App = require('./views/app')

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this

  self.view = new App({ el: document.body })
  self.view.render()

  parseCSV('data/routes.csv')
})
