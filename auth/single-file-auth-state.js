const { writeJSON, readJSON } = require('./files')

function useSingleFileAuthState(file = './auth.json') {
  const creds = readJSON(file) || {}

  return {
    state: creds,
    saveCreds: () => writeJSON(file, creds)
  }
}

module.exports = { useSingleFileAuthState }