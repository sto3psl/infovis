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
  var plot = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.plot'
  })

  plot.addDataSet([80, 50, 20, 45, 28])

  console.log(plot.data)

  var plot1 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot2 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot3 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
})
