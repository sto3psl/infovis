function Filter () {
  this.StopList = []
  this.routeList = []
  this.agencyList = []

  console.log(this.stops)
  console.log(this.routes)
  console.log(this.agencies)

  this.addToAgencyList()
}

Filter.prototype.addToAgencyList = function (value) {
  this.agencyList.push(value)
  console.log(this.agencyList)
  Filter.renderAgencyList('#agencyList', this.agencyList)
}

Filter.renderAgencyList = function (e, list) {
  var element = document.querySelector(e)
  element.innerHTML = ''

  for (var i = 1; i < list.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = '<button>x</button> ' + list[i]
    element.appendChild(li)
  }
}

Filter.prototype.getAgencyList = function () {
  console.log(this.agencyList)
}

module.exports = Filter
