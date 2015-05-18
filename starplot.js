var d3 = require('d3')

var Starplot = function (data) {
  console.log(data)
  return d3.select('main').append('svg').attr('viewBox', '0 0 100 100')
}

module.exports = Starplot
