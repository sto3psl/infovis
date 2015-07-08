var Stop = require('./stop')

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

  console.log('Haltestellen: ' + stops.length)
  console.log('Linien: ' + routes.length)
  console.log(result.length)
  return result
}

module.exports = generateStops
