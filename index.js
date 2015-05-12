var domready = require('domready')
var Model = require('./models/model')
var Papa = require('papaparse')

var App = require('./views/app')

var routes = new Model('routes')
Papa.parse('./data/routes.csv', {
  download: true,
  complete: function (results) {
    routes.data = results
    console.log(routes.data)
  }
})

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this

  self.view = new App({ el: document.body })
  self.view.render()
  setTimeout(function () {
    console.log(routes.data)
  }, 2000)
})
