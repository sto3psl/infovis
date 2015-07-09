var arrayUniq = require('array-uniq')
var Starplot = require('./starplot')

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

  this.dev = route

  this.setTrips()
  this.setAgencies()
  this.setTypes()
  this.setAverageTripsPerRoute()
}

Stop.prototype.drawStarplot = function () {
  var data = this.getStopData()
  var result = []

  for (var i = 0; i < data.length; i++) {
    if (data[i] < 10) {
      result[i] = data[i] * 10
    } else if (data[i] > 10 && data[i] < 100) {
      result[i] = data[i]
    } else if (data[i] > 100 && data[i] < 1000) {
      result[i] = data[i] / 10
    } else if (data[i] > 1000 && data[i] < 10000) {
      result[i] = data[i] / 100
    } else {
      result[i] = data[i] / 1000
    }
  }

  var plot = new Starplot({
    selector: '.small-plots',
    label: this.name,
    data: result
  })
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
    this.getAgencyCount(),
    this.getTripCount(),
    this.getRouteCount(),
    this.getAverageTripsPerRoute(),
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
