var domready = require('domready')
var Route = require('./models/routes')
var parseCSV = require('./parser')
var Papa = require('papaparse')

var App = require('./views/app')

Papa.parse('./data/routes.csv', {
    download: true,
    complete: function (results) {
      console.log(results)

      var me = new Route({
        data: results
      })
      console.log(me.data)
    }
  })

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this

  self.view = new App({ el: document.body })
  self.view.render()

})

