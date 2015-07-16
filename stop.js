var arrayUniq = require('array-uniq')
var Starplot = require('./starplot')
var Hammer = require('hammerjs')
var d3 = require('d3')

var template = require('./views/details.jade')

function Stop (stop, route) {
  this.id = stop.stop_id
  this.name = stop.stop_name
  this.routes = stop.route
  this.tripCount = 0
  this.averageTripsPerRoute = 0
  this.agencies = []
  this.types = []
  this.averageAttributes = []
  this.hammertime = undefined

  this.dev = route

  this.setTrips()
  this.setAgencies()
  this.setTypes()
  this.setAverageTripsPerRoute()
}

Stop.prototype.addTouchEvent = function (obj, event, func) {
  this.hammertime.on(event, function () {
    func(obj)
  })
}

Stop.prototype.showDetails = function (obj) {
  console.log(obj)
  document.querySelector('.small-plots .details').style.display = 'block'
  document.querySelector('.small-plots .details').innerHTML += template({data: obj})

  document.querySelector('.details button').addEventListener('click', function () {
    document.querySelector('.small-plots .details').style.display = 'none'
    document.querySelector('.small-plots .details').innerHTML = ''
  }, false)
}

Stop.prototype.drawStarplot = function () {
  var data = this.getStopData()
  var result = []

  result[0] = data[0] / 1000
  result[1] = data[1] / 100
  result[2] = data[2] * 5
  result[3] = data[3] * 20
  result[4] = data[4] * 20

  this.plot = new Starplot({
    selector: '.small-plots',
    label: this.name,
    data: result,
    id: this.id
  })

  this.hammertime = new Hammer(document.querySelector('#stop-' + this.id))
  this.addTouchEvent(this, 'doubletap', this.showDetails)
  this.addTouchEvent(this, '')
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
  return this.dev
}

Stop.prototype.getName = function () {
  return this.name
}

Stop.prototype.getRouteCount = function () {
  return this.routes.length
}

Stop.prototype.getTripCount = function () {
  return this.tripCount
}

Stop.prototype.getAgencyCount = function () {
  return this.agencies.length
}

Stop.prototype.getTypeCount = function () {
  return this.types.length
}

Stop.prototype.getAverageTripsPerRoute = function () {
  return this.averageTripsPerRoute
}

module.exports = Stop
