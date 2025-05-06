const fs = require('fs')

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function readJSON(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : null
}

module.exports = { writeJSON, readJSON }