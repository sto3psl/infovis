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

StopList.prototype.draw = function () {
  for (var i = 0; i < this.data.length; i++) {
    this.data[i].drawStarplot()
  }
}

StopList.prototype.addStop = function (stop) {
  this.data.push(stop)
}

StopList.prototype.removeStop = function (stop) {
  var index = this.data.indexOf(stop)
  console.log(this.data.indexOf(stop))
  this.data.splice(index, 1)
  console.log(this.data)
  document.querySelector('.small-plots').innerHTML = '<div class="details"></div>'

  this.draw()
}

module.exports = StopList
