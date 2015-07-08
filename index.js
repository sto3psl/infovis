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

      for (var i = 0; i < stops.length; i++) {
        if (stops[i].agencies.length > 1) {
          console.log(stops[i].agencies)
        }
      };

      stops[0].getStopData()
      stops[1000].drawStarplot()
      stops[2000].drawStarplot()
      stops[3000].drawStarplot()
      stops[4000].drawStarplot()
      stops[5000].drawStarplot()
      stops[6000].drawStarplot()
      stops[7000].drawStarplot()
      stops[8000].drawStarplot()
      stops[9000].drawStarplot()
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
