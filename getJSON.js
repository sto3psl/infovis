var xhr = new window.XMLHttpRequest()

var getJSON = function (uri, callback) {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText)
      console.log(json)
      console.log('Download finished')
      callback(json)
    }
  }

  xhr.open('GET', uri, true)
  xhr. send()
}

module.exports = getJSON
