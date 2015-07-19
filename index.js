var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')
var generateStops = require('./generateStops')
var StopList = require('./stopList')
var Filter = require('./filter')

var agenciesRaw = []
var stopsRaw = []
var routesRaw = []

var stop = []

getJSON('./data/agency.json', function (data) {
  agenciesRaw = data

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

      stop = generateStops(stopsRaw, routesRaw)
      var filter = new Filter()

      var visibleStops = new StopList([
        stop[115],
        stop[200],
        stop[300]
      ])

      document.querySelector('.vbb').addEventListener('change', function () {
        filter.addToAgencyList(document.querySelector('.vbb').value)
      }, false)

      document.querySelector('.types').addEventListener('change', function () {
        filter.addToTypeList(document.querySelector('.types').value)
      }, false)

      document.querySelector('#search').addEventListener('input', function () {
        var searchResult = []
        if (this.value.length > 2) {
          searchResult = filter.searchStopList(stop, this.value)
          console.log(searchResult)
        }

        filter.renderSearchResults(searchResult, function (result) {
          for (var i = 0; i < stop.length; i++) {
            if (stop[i].id === result) {
              console.log(stop[i])
              visibleStops.addStop(stop[i])
            }
          }
        })
      }, false)

      document.querySelector('#search-results').addEventListener('click', function (evt) {
        console.log(evt.target.dataset.id)
        for (var i = 0; i < stop.length; i++) {
          if (stop[i].id === evt.target.dataset.id) {
            visibleStops.addStop(stop[i])
          }
        };
      }, false)

      // document.querySelector('')
      stop[0].getStopData()
      // console.log(stops[115])
      // stops[200].drawStarplot()
      // stops[300].drawStarplot()
      // stops[400].drawStarplot()
      // stops[500].drawStarplot()
      // stops[600].drawStarplot()
      // stops[700].drawStarplot()
      // stops[800].drawStarplot()
      // stops[900].drawStarplot()

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
    data: [0, 0, 0, 0, 0],
    selector: '.plot'
  })

  var filterInput = document.querySelectorAll('input, select')

  for (var i = 0; i < filterInput.length; i++) {
    filterInput[i].addEventListener('focus', function () {
      var header = document.querySelector('header')
      var button = document.querySelector('#show-filter img')

      header.className = 'expanded'
      button.className = 'rotated'
    }, false)
  }
})
