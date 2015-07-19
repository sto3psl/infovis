var Hammer = require('hammerjs')

function StopList (stops) {
  var self = this
  this.data = []
  this.preventClick = false

  if (stops.constructor === Array) {
    for (var i = 0; i < stops.length; i++) {
      this.addStop(stops[i])
    }
  }

  if (this.data.length > 1) {
    this.draw()
  }

  var pressEvent = new Hammer(document.querySelector('.small-plots'))

  pressEvent.on('press', function (evt) {
    self.preventClick = true
    var svg = evt.target
    svg.classList.add('remove')
  }, false)
  pressEvent.on('pressup', function (evt) {
    setTimeout(function () {
      self.preventClick = false
    }, 0)
    var svg = evt.target
    svg.classList.remove('remove')

    for (var i = 0; i < self.data.length; i++) {
      if (svg.parentNode.id === 'stop-' + self.data[i].id) {
        self.removeStop(self.data[i])
      }
    }
  }, false)
}

StopList.prototype.setActivePlot = function (obj, event) {
  document.querySelector(obj).addEventListener(event, this.increaseActiveElements.bind(this), false)
}

StopList.prototype.increaseActiveElements = function (event) {
  console.log('click', this.preventClick)
  if (this.preventClick) return
  var el = event.target

  var path = el.tagName !== 'path' ? el.querySelector('path') : el
  var div = path.parentNode.parentNode
  var newPath = path.cloneNode()
  var bigPlot = document.querySelector('.plot .star-plot svg')

  div.classList.toggle('active')
  if (div.classList[1] !== 'active') {
    var d = document.querySelector('.' + div.id)
    bigPlot.removeChild(d)
    path.classList.remove(path.classList[1])

  } else {
    var appended = bigPlot.appendChild(newPath)
    appended.classList.add(div.id)

    var smallActivePlots = document.querySelectorAll('.small-plots .active svg path')
    var bigActivePlots = document.querySelectorAll('path[class*="stop-"]')
    for (var i = 0; i < bigActivePlots.length; i++) {
      smallActivePlots[i].classList.add('active-' + i)
      bigActivePlots[i].classList.add('active-' + i)
    }
  }
  console.log(path.classList)
}

StopList.prototype.draw = function () {
  document.querySelector('.small-plots').innerHTML = '<div class="details"></div>'

  for (var i = 0; i < this.data.length; i++) {
    this.data[i].drawStarplot()
    this.setActivePlot('#stop-' + this.data[i].id, 'click')
  }
}

StopList.prototype.addStop = function (stop) {
  if (this.data.length < 9) {
    this.data.push(stop)

    this.draw()
  } else {
    window.alert('You can only select 9 Stops at once.')
  }
}

StopList.prototype.removeStop = function (stop) {
  var index = this.data.indexOf(stop)
  console.log(this.data.indexOf(stop))
  this.data.splice(index, 1)
  console.log(this.data)

  this.draw()
}

module.exports = StopList
