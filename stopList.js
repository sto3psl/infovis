function StopList (stops) {
  this.data = []

  if (stops.constructor === Array) {
    for (var i = 0; i < stops.length; i++) {
      this.addStop(stops[i])
    }
  }

  if (this.data.length > 1) {
    this.draw()
  }
}

StopList.prototype.setActivePlot = function (obj, event) {
  document.querySelector(obj).addEventListener(event, this.increaseActiveElements, false)
}

StopList.prototype.increaseActiveElements = function () {
  var path = this.childNodes[0].childNodes[0]
  var newPath = path.cloneNode()
  var bigPlot = document.querySelector('.plot .star-plot svg')

  this.classList.toggle('active')
  if (this.classList[1] !== 'active') {
    var d = document.querySelector('.' + this.id)
    bigPlot.removeChild(d)
    path.classList.remove(path.classList[1])

  } else {
    var appended = bigPlot.appendChild(newPath)
    appended.classList.add(this.id)

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
