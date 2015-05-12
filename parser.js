var Papa = require('papaparse')

// Funktion die unsere CSV-Dateien in JSON parsed
module.exports = function (file) {
  Papa.parse(file, {
    download: true,
    complete: function (results) {
      console.log(results)
    }
  })
}
