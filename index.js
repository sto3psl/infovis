var domready = require('domready')
var Data = require('./models/data')
var Papa = require('papaparse')
var Collection = require('ampersand-collection')

var App = require('./views/app')

var data = new Collection({
  model: Data
})
// data.on('reset', function () {
//   console.log('reset')
// })

var parseCSV = function (file, data, callback) {
  Papa.parse(file, {
    download: true,
    header: true,
    complete: function (results) {
      data.reset(results.data)
      // console.log(results.data)
      callback()
    }
  })
}

parseCSV('./data/routes.txt', data, function () {
  // Code wird erst ausgeführt wenn die DOM geladen wurde
  domready(function () {
    var self = this
    self.view = new App({ el: document.body, collection: data })
    self.view.render()
  })
})
