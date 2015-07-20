function Filter () {
  this.StopList = []
  this.routeList = []
  this.agencyList = []
  this.typeList = []

}

Filter.prototype.addToAgencyList = function (value) {
  this.agencyList.push(value)
  this.renderList('#agencyList', this.agencyList)
}

Filter.prototype.renderList = function (e, list) {
  var element = document.querySelector(e)
  element.innerHTML = ''
  for (var i = 0; i < list.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = '<button class="delete del-' + i + '">x</button>' + '<span class="del-' + i + '">' + list[i] + '</span>'
    element.appendChild(li)

  }
}

Filter.prototype.addToTypeList = function (value) {
  this.typeList.push(value)
  this.renderList('#typeList', this.typeList)
}

Filter.prototype.getAgencyList = function () {}

Filter.prototype.removeFromList = function () {}

Filter.prototype.searchStopList = function (stops, name) {
  var result = []
  for (var i = 0; i < stops.length; i++) {
    if (stops[i].name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
      result.push(stops[i])
    }
  }
  return result
}

Filter.prototype.renderSearchResults = function (results, callback) {
  var element = document.querySelector('#search-results')
  element.innerHTML = ''
  for (var i = 0; i < results.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = '<button data-id="' + results[i].id + '">' + results[i].name + '</button>'
    element.appendChild(li)
  }
}

module.exports = Filter
