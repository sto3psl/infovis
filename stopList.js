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
  document.querySelector('.small-plots').innerHTML = '<div class="details"></div>'

  for (var i = 0; i < this.data.length; i++) {
    this.data[i].drawStarplot()
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
