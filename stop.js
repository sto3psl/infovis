var arrayUniq = require('array-uniq')
var Starplot = require('./starplot')
var Hammer = require('hammerjs')

var template = require('./views/details.jade')

function Stop (stop, route) {
  // console.log(stop)
  // console.log(route)

  this.id = stop.stop_id
  this.name = stop.stop_name
  this.routes = stop.route
  this.tripCount = 0
  this.averageTripsPerRoute = 0
  this.agencies = []
  this.types = []
  this.averageAttributes = []

  this.dev = route

  this.setTrips()
  this.setAgencies()
  this.setTypes()
  this.setAverageTripsPerRoute()
  // console.log('#stop-' + this.id)
}

Stop.prototype.addEvents = function (data) {
  var hammertime = new Hammer(document.querySelector('#stop-' + this.id))

  hammertime.on('doubletap', function (ev) {
    console.log(data.routes)
    var smallPlots = document.querySelectorAll('.small-plots .star-plot')

    for (var i = 0; i < smallPlots.length; i++) {
      // smallPlots[i].style.display = 'none'
    }
    console.log(data.name)
    document.querySelector('.small-plots .details').style.display = 'block'
    document.querySelector('.small-plots .details').innerHTML += template({data: data})

    document.querySelector('.details button').addEventListener('click', function () {
      document.querySelector('.small-plots .details').style.display = 'none'
      document.querySelector('.small-plots .details').innerHTML = ''
      var smallPlots = document.querySelectorAll('.small-plots .star-plot')

      // for (var i = 0; i < smallPlots.length; i++) {
      //   smallPlots[i].style.display = 'block'
      // }
    }, false)
  })
}

Stop.prototype.drawStarplot = function () {
  var data = this.getStopData()
  var result = []

  result[0] = data[0] / 1000
  result[1] = data[1] / 100
  result[2] = data[2] * 5
  result[3] = data[3] * 20
  result[4] = data[4] * 20

  var plot = new Starplot({
    selector: '.small-plots',
    label: this.name,
    data: result,
    id: this.id
  })

  this.addEvents(this)
}

Stop.prototype.setTypes = function () {
  for (var i = 0; i < this.dev.length; i++) {
    this.types.push(this.dev[i].route_type)
  }
  this.types = arrayUniq(this.types)
}

Stop.prototype.setTrips = function () {
  for (var i = 0; i < this.dev.length; i++) {
    this.tripCount += this.dev[i].trips
  }
}

Stop.prototype.setAgencies = function () {
  for (var i = 0; i < this.dev.length; i++) {
    this.agencies.push(this.dev[i].agency_id)
  }
  this.agencies = arrayUniq(this.agencies)
}

Stop.prototype.setAverageTripsPerRoute = function () {
  this.averageTripsPerRoute = Math.round(this.tripCount / this.routes.length)
}

Stop.prototype.getStopData = function () {
  return [
    this.getTripCount(),
    this.getAverageTripsPerRoute(),
    this.getRouteCount(),
    this.getAgencyCount(),
    this.getTypeCount()
  ]
}

Stop.prototype.getDev = function () {
  console.log(this.dev)
  return this.dev
}

Stop.prototype.getName = function () {
  // console.log(this.name)
  return this.name
}

Stop.prototype.getRouteCount = function () {
  // console.log(this.routes.length)
  return this.routes.length
}

Stop.prototype.getTripCount = function () {
  // console.log(this.trips)
  return this.tripCount
}

Stop.prototype.getAgencyCount = function () {
  // console.log(this.agencies.length)
  return this.agencies.length
}

Stop.prototype.getTypeCount = function () {
  // console.log(this.types.length)
  return this.types.length
}

Stop.prototype.getAverageTripsPerRoute = function () {
  return this.averageTripsPerRoute
}

module.exports = Stop
