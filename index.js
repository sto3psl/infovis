var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')
var generateStops = require('./generateStops')
var Filter = require('./filter')

var agenciesRaw = []
var stopsRaw = []
var routesRaw = []

var stops = []

getJSON('./data/agency.json', function (data) {
  agenciesRaw = data

  console.log(agenciesRaw)
  var selectVbb = document.querySelector('.vbb')
  for (var i = 0; i < agenciesRaw.length; i++) {
    var option = document.createElement('option')
    option.text = agenciesRaw[i].agency_name
    selectVbb.add(option)
  }

  getJSON('./data/stops.json', function (data) {
    stopsRaw = data

    getJSON('./data/routes.json', function (data) {
      routesRaw = data

      stops = generateStops(stopsRaw, routesRaw)
      var filter = new Filter()

      console.log(stops[1])

      document.querySelector('.vbb').addEventListener('change', function () {
        filter.addToAgencyList(document.querySelector('.vbb').value)
      }, false)

      document.querySelector('.types').addEventListener('change', function () {
        filter.addToTypeList(document.querySelector('.types').value)
      }, false)

      document.querySelector('#search').addEventListener('input', function () {
        var searchResult = []
        if (this.value.length > 2) {
          console.log(this.value)
          searchResult = filter.searchStopList(stops, this.value)
        }
        filter.renderSearchResults(searchResult)
      }, false)

      // document.querySelector('')

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

      document.querySelector('#show-filter').addEventListener('click', function () {
        var header = document.querySelector('header')
        var button = document.querySelector('#show-filter img')

        if (header.className === 'expanded') {
          header.className = 'not-expanded '
          button.className = 'not-rotated'
        } else if (header.className !== 'expanded') {
          header.className = 'expanded'
          button.className = 'rotated'
        }
      }, false)
    })
  })
})

domready(function () {
  var clickControl = false
  document.querySelector('#help').addEventListener('click', function () {
    if (clickControl === false) {
      document.querySelector('#help-div').style.display = 'block'
      clickControl = true
    } else {
      document.querySelector('#help-div').style.display = 'none'
      clickControl = false
    }
  }, false)
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
