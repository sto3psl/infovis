var domready = require('domready')
var Model = require('./models/model')
var Papa = require('papaparse')
var Collection = require('ampersand-collection')

var App = require('./views/app')

var routes = new Collection({
  model: Model
})
routes.on('reset', function () {
  console.log('reset')
})
Papa.parse('./data/routes.csv', {
  download: true,
  header: true,
  complete: function (results) {
    routes.reset(results.data)
    console.log(results.data[0])
  }
})

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this
  self.view = new App({ el: document.body, collection: routes })
  self.view.render()
})
