var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')

getJSON('./data/agency.json', function (data) {
  console.log(data)

  var select = document.querySelector('#agency')

  for (var i = 0; i < data.length; i++) {
    var opt = document.createElement('option')
    opt.value = data[i].agency_name
    opt.innerHTML = data[i].agency_name
    select.appendChild(opt)
  }

  getJSON('./data/stops.json', function (data) {
    console.log(data)

    var select = document.querySelector('#stops')

    for (var i = 0; i < 20; i++) {
      var opt = document.createElement('option')
      opt.value = data[i].stop_name
      opt.innerHTML = data[i].stop_name + ' ' + data[i].route.length
      select.appendChild(opt)
    }

    getJSON('./data/routes.json', function (data) {
      var select = document.querySelector('#route')

      for (var i = 0; i < 20; i++) {
        var opt = document.createElement('option')
        opt.value = data[i].route_short_name
        opt.innerHTML = data[i].route_short_name
        select.appendChild(opt)
      }
    })
  })
})

domready(function () {
  // here comes Code which doesnt need the data
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .addDataSet([40, 10, 20, 20, 50])
    .addDataSet([10, 50, 30, 40, 20])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes()
})
