var domready = require('domready')

var Starplot = require('./starplot')
var getJSON = require('./getJSON')

getJSON('./data/agency.json', function (data) {
  var select = document.querySelector('#agency')

  for (var i = 0; i < data.length; i++) {
    var opt = document.createElement('option')
    opt.value = data[i].agency_name
    opt.innerHTML = data[i].agency_name
    select.appendChild(opt)
  }

  getJSON('./data/stops.json', function (data) {
    var select = document.querySelector('#stops')

    for (var i = 0; i < 20; i++) {
      var opt = document.createElement('option')
      opt.value = data[i].stop_name
      opt.innerHTML = data[i].stop_name + ' ' + data[i].route.length
      select.appendChild(opt)
    }

    getJSON('./data/routes.json', function (data) {
      var select = document.querySelector('#route')

      for (var i = 0; i < 20; i++) {
        var opt = document.createElement('option')
        opt.value = data[i].route_short_name
        opt.innerHTML = 'Linie ' + data[i].route_short_name
        select.appendChild(opt)
      }
    })
  })
})

domready(function () {
  var clickControl = false
  document.querySelector('#help').addEventListener('click', function () {
    if (clickControl === false) {
      document.querySelector('#welcomeDiv').style.display = 'block'
      clickControl = true
    }
    else {
      document.querySelector('#welcomeDiv').style.display = 'none'
      clickControl = false
    }

  }, false)
  // here comes Code which doesnt need the data
  var plot = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.plot'
  })
  plot.addDataSet([50, 40, 10, 60, 53])

  var plot1 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot2 = new Starplot({
    data: [50, 40, 10, 60, 53],
    selector: '.small-plots',
    label: 'Bahnhof'
  })
  var plot3 = new Starplot({
    data: [90, 20, 50, 25, 8],
    selector: '.small-plots',
    label: 'Bahnhof'
  })

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
