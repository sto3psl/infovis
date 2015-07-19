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
  console.log(e)
  for (var i = 0; i < list.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = '<button class="delete del-' + i + '">x</button>' + '<span class="del-' + i + '">' + list[i] + '</span>'
    element.appendChild(li)

    // var elementName = e + ' button.del-' + i
    // var name = 'del-' + i
    // var value = document.querySelector('span.del-' + i)

  // document.querySelector(elementName).addEventListener('click', this.removeFromList.bind(this), false)
  }
}

Filter.prototype.addToTypeList = function (value) {
  this.typeList.push(value)
  console.log(this.typeList)
  this.renderList('#typeList', this.typeList)
}

Filter.prototype.getAgencyList = function () {
  console.log(this.agencyList)
}

Filter.prototype.removeFromList = function () {
  // console.log(this.agencyList)
}

Filter.prototype.searchStopList = function (stops, name) {
  var result = []
  for (var i = 0; i < stops.length; i++) {
    if (stops[i].name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
      result.push(stops[i])
    }
  }
  // console.log(result)
  return result
}

Filter.prototype.renderSearchResults = function (results, callback) {
  // console.log(results)

  var element = document.querySelector('#search-results')
  element.innerHTML = ''
  for (var i = 0; i < results.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = '<button data-id="' + results[i].id + '">' + results[i].name + '</button>'
    element.appendChild(li)
  }

// console.log(element)
}

module.exports = Filter
