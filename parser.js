var Baby = require('babyparse')
var fs = require('fs')
var replace = require('replace')

fs.readFile(process.argv[2], {'encoding': 'utf-8'}, function (err, data) {
  if (err) throw err
  // console.log(data)
  var parsed = Baby.parse(data, {
    header: true
  })

  for (var i = parsed.data.length - 1; i >= 0; i--) {
    delete parsed.data[i].stop_id
    delete parsed.data[i].stop_code
    delete parsed.data[i].stop_desc
    delete parsed.data[i].stop_lat
    delete parsed.data[i].stop_lon
    delete parsed.data[i].stop_url
    delete parsed.data[i].zone_id
    delete parsed.data[i].location_type
    delete parsed.data[i].parent_station
  }

  // console.log(JSON.stringify(parsed.data[0]))

  fs.writeFile(process.argv[3], JSON.stringify(parsed), function (err) {
    if (err) throw err
    // replace({
    //   regex: '"stop_code":"",',
    //   replacement: '',
    //   paths: ['./stops.json'],
    //   recursive: true,
    //   silent: true
    // })
    // replace({
    //   regex: '"stop_code",',
    //   replacement: '',
    //   paths: ['./stops.json'],
    //   recursive: true,
    //   silent: true
    // })
    console.log(JSON.stringify(parsed.data[0]) + '\n' + JSON.stringify(parsed.data[10]))
    console.log('Baby parsed!')
  })
})
