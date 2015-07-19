var Stop = require('./stop')

var average = [0, 0, 0, 0, 0]

function generateStops (stops, routes) {
  var result = []
  for (var i = 0; i < stops.length; i++) {
    var tempRoutes = []

    for (var j = 0; j < routes.length; j++) {
      for (var h = 0; h < stops[i].route.length; h++) {
        if (stops[i].route[h] === routes[j].route_id) {
          tempRoutes[h] = routes[j]
        }
      }
    }
    result[i] = new Stop(stops[i], tempRoutes)
  }

  for (i = 0; i < result.length; i++) {
    average[0] += result[i].agencies.length
    average[1] += result[i].tripCount
    average[2] += result[i].routes.length
    average[3] += result[i].averageTripsPerRoute
    average[4] += result[i].types.length
  }

  for (i = 0; i < average.length; i++) {
    average[i] = average[i] / stops.length
  }

  for (i = 0; i < result.length; i++) {
    result[i].averageAttributes = average
  }

  console.log('Haltestellen: ' + stops.length)
  console.log('Linien: ' + routes.length)
  return result
}

module.exports = generateStops
