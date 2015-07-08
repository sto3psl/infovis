var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')
var generateStops = require('./generateStops')

var agenciesRaw = []
var stopsRaw = []
var routesRaw = []

var stops = []

getJSON('./data/agency.json', function (data) {

  agenciesRaw = data

  getJSON('./data/stops.json', function (data) {

    stopsRaw = data

    getJSON('./data/routes.json', function (data) {

      routesRaw = data

      stops = generateStops(stopsRaw, routesRaw)

      console.log(stops[10000])
    })
  })
})

domready(function () {
  // here comes Code which doesnt need the data
  var plot = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.plot'
  })
  plot.addDataSet([50, 40, 10, 60, 53])
  plot.addDataSet([38, 75, 37, 85, 13])

  var plot1 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot2 = new Starplot({
    data: [50, 40, 10, 60, 53],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot3 = new Starplot({
    data: [38, 75, 37, 85, 13],
    selector: '.small-plots',
    label: 'Bahnhof'
  })

  // plot3.click()

  // var smallPlots = document.querySelectorAll('.small-plots div')
  // console.log(smallPlots)

  // for (var i = 0; i < smallPlots.length; i++) {
  //   smallPlots[i].addEventListener('click', function () {
  //     console.log(this)
  //     this.className += ' active'
  //   }, false)
  // }
})
