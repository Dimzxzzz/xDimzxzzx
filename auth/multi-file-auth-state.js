const path = require('path')
const { writeJSON, readJSON } = require('./files')

function useMultiFileAuthState(folder = './auth_info') {
  const stateFile = path.join(folder, 'state.json')
  const creds = readJSON(stateFile) || {}

  return {
    state: creds,
    saveCreds: () => writeJSON(stateFile, creds)
  }
}

module.exports = { useMultiFileAuthState }
