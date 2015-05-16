var domready = require('domready')
var Model = require('./models/model')
var Papa = require('papaparse')
var Collection = require('ampersand-collection')

var App = require('./views/app')

var data = new Collection({
  model: Model
})
// data.on('reset', function () {
//   console.log('reset')
// })
Papa.parse('./data/routes.csv', {
  download: true,
  header: true,
  complete: function (results) {
    data.reset(results.data)
    console.log(results.data)
  }
})

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this
  self.view = new App({ el: document.body, collection: data })
  self.view.render()
})
