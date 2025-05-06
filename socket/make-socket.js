const EventEmitter = require('events')
const { proto } = require('../protobuf/WAProto')
const { fetchLatestBaileysVersion } = require('../version')
const { useMultiFileAuthState } = require('../auth/multi-file-auth-state')

function makeWASocket(config = {}) {
  const ev = new EventEmitter()
  const { auth, logger = console } = config

  const sendMessage = async (jid, content) => {
    const message = proto.Message(content)
    logger.log(`Sending to ${jid}:`, message)
  }

  const sock = {
    ev,
    sendMessage,
    logger,
    auth
  }

  setTimeout(() => {
    ev.emit('connection.update', { connection: 'open', isNewLogin: true })
  }, 1000)

  return sock
}

module.exports = makeWASocket