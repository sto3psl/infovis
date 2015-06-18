var domready = require('domready')

var Starplot = require('./starplot')

var addText = function (parent, text) {
  var node = document.createElement('p')
  var textnode = document.createTextNode(text)
  node.appendChild(textnode)
  document.querySelector(parent).appendChild(node)
}

var xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // here comes Code that executes after the data file is loaded
    var data = JSON.parse(xhr.responseText)
    console.log(data)
    
    var select = document.querySelector('#stops')

    for (var i = 0; i < 20; i++) {
      var opt = document.createElement('option')
      opt.value = data.data[i].stop_name
      opt.innerHTML = data.data[i].stop_name
      select.appendChild(opt)
    };

    document.querySelector('button').onclick = function () {
      console.log(data)
      addText('.data', 'fuck off')

    }
  }
}

xhr.open('GET', './data/stops.json', true)
xhr.send()

domready(function () {
  // here comes Code which doesnt need the data
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
    .drawAxes({scaleAccuracy: 10})
  new Starplot('main')
    .addDataSet([30, 20, 40, 20, 10])
    .drawAxes()
})
