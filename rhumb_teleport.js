const turf = require('@turf/turf')
let chunks = []

process.stdin.on('data', chunk => {
  chunks.push(chunk)
}).on('end', () => {
  let f = JSON.parse(chunks.join('')).features[0]
  let origin = f.geometry.coordinates[0][0]
  let target = [129.844923, 32.759936]
  f.geometry.coordinates[0].forEach((v, i) => {
    f.geometry.coordinates[0][i] = turf.rhumbDestination(
      target,
      turf.rhumbDistance(origin, v),
      turf.rhumbBearing(origin, v)
    ).geometry.coordinates
  })
  console.log(JSON.stringify(f, null, 2))
})
