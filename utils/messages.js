function generateMessageID() {
  return Date.now().toString(36)
}

module.exports = { generateMessageID }
