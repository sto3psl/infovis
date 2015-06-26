var domready = require('domready')

var Starplot = require('./starplot')

var a

var xhr = new window.XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // here comes Code that executes after the data file is loaded
    var data = JSON.parse(xhr.responseText)
    console.log(data[0])

    var select = document.querySelector('#stops')

    for (var i = 100; i < 120; i++) {
      var opt = document.createElement('option')
      opt.value = data[i].stop_name
      opt.innerHTML = data[i].stop_name + ' ' + data[i].route.length
      select.appendChild(opt)
    }
  }
}

xhr.open('GET', './data/stops.json', true)
xhr.send()

domready(function () {
  // here comes Code which doesnt need the data
  a = new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes()
})
