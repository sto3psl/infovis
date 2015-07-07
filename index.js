var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')

getJSON('./data/agency.json', function (data) {
  // console.log(data)

  var select = document.querySelector('#agency')

  for (var i = 0; i < data.length; i++) {
    var opt = document.createElement('option')
    opt.value = data[i].agency_name
    opt.innerHTML = data[i].agency_name
    select.appendChild(opt)
  }

  getJSON('./data/stops.json', function (data) {
    // console.log(data)

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
  // here comes Code which doesnt need the data
  var plot = new Starplot([10, 20, 30, 40, 50], 'main')
  plot.addDataSet([20, 20, 30, 40, 50])

  console.log(plot.data)

  var plot2 = new Starplot([10, 20, 30, 40, 50], 'main')
  var plot3 = new Starplot([10, 20, 30, 40, 50], 'main')
  var plot4 = new Starplot([10, 20, 30, 40, 50], 'main')
  var plot5 = new Starplot([10, 20, 30, 40, 50], 'main')

  // plot.removeDataSet(1)
  plot.addAxisScale()

  console.log(plot2.data)
})
