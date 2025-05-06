function validateConnection(update) {
  return update.connection === 'open'
}

module.exports = { validateConnection }
