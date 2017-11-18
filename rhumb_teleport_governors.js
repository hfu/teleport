const turf = require('@turf/turf')
let chunks = []

process.stdin.on('data', chunk => {
  chunks.push(chunk)
}).on('end', () => {
  let f = JSON.parse(chunks.join('')).features[0]
  let origin = f.geometry.coordinates[0][0]
  let target = [-74.01971, 40.69137]
  f.geometry.coordinates[0].forEach((v, i) => {
    f.geometry.coordinates[0][i] = turf.rhumbDestination(
      target,
      turf.rhumbDistance(origin, v),
      turf.rhumbBearing(origin, v)
    ).geometry.coordinates
  })
  console.log(JSON.stringify(f, null, 2))
})
