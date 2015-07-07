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
        opt.innerHTML = 'Linie ' + data[i].route_short_name
        select.appendChild(opt)
      }
    })
  })
})

domready(function () {
  var clickControl = false
  document.querySelector('#help').addEventListener('click', function () {
    if (clickControl === false) {
      document.querySelector('#help-div').style.display = 'block'
      clickControl = true
    }
    else {
      document.querySelector('#help-div').style.display = 'none'
      clickControl = false
    }

  }, false)
  // here comes Code which doesnt need the data
  new Starplot('main')
    .addDataSet([40, 10, 20, 20, 50])
    .addDataSet([10, 50, 30, 40, 20])
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([40, 10, 20, 20, 50])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
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
})
