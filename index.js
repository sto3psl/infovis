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

var plot

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
        for (var i = 0; i < stop.length; i++) {
          if (stop[i].id === evt.target.dataset.id) {
            visibleStops.addStop(stop[i])
          }
        }
      }, false)

      stop[0].getStopData()

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

      var bigPlot = document.querySelector('.plot svg')
      console.log(bigPlot)

      bigPlot.addEventListener('click', function (evt) {
        var p = document.querySelectorAll('.active p')
        for (var i = 0; i < p.length; i++) {
          p[i].innerHTML = ''
        }

        var highlight = document.querySelectorAll('.highlight')
        for (i = 0; i < highlight.length; i++) {
          highlight[i].classList.remove('highlight')
        }

        var axis = evt.target.getAttribute('href')
        console.log(axis)
        var activePlots = document.querySelectorAll('.active')
        console.log(activePlots)
        var activeStops = []
        for (i = 0; i < visibleStops.data.length; i++) {
          for (var j = 0; j < activePlots.length; j++) {
            if ('stop-' + visibleStops.data[i].id === activePlots[j].id) {
              activeStops.push(visibleStops.data[i])
            }
          }
        }

        var axes = document.querySelectorAll('line')
        console.log(axes)
        console.log(activeStops)
        switch (axis) {
          case 'assets/Fahrten_Icon.svg':
            console.log(visibleStops.data[0])
            for (i = 0; i < activeStops.length; i++) {
              var value = document.createElement('p')
              value.innerHTML = activeStops[i].getTripCount()
              activePlots[i].appendChild(value)
            }
            axes[0].classList.add('highlight')
            break
          case 'assets/Durchschnitt_Icon.svg':
            for (i = 0; i < activeStops.length; i++) {
              var value = document.createElement('p')
              value.innerHTML = activeStops[i].getAverageTripsPerRoute()
              activePlots[i].appendChild(value)
            }
            axes[1].classList.add('highlight')
            break
          case 'assets/Linie_Icon.svg':
            for (i = 0; i < activeStops.length; i++) {
              var value = document.createElement('p')
              value.innerHTML = activeStops[i].getRouteCount()
              activePlots[i].appendChild(value)
            }
            axes[2].classList.add('highlight')
            break
          case 'assets/Verbuende_Icon.svg':
            for (i = 0; i < activeStops.length; i++) {
              var value = document.createElement('p')
              value.innerHTML = activeStops[i].getAgencyCount()
              activePlots[i].appendChild(value)
            }
            axes[3].classList.add('highlight')
            break
          case 'assets/Typen_Icon.svg':
            for (i = 0; i < activeStops.length; i++) {
              var value = document.createElement('p')
              value.innerHTML = activeStops[i].getTypeCount()
              activePlots[i].appendChild(value)
            }
            axes[4].classList.add('highlight')
            break
        }
      })
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
  plot = new Starplot({
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
