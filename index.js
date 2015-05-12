var domready = require('domready')
var Route = require('./models/routes')

var App = require('./views/app')

// Code wird erst ausgeführt wenn die DOM geladen wurde
domready(function () {
  var self = this

  self.view = new App({ el: document.body })
  self.view.render()

  var me = new Route({
    data: {
      'name': 'fabian'
    }
  })

  console.log(me.data.name)
})
