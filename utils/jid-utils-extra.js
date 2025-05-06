function jidDecode(jid) {
  return { user: jid.split('@')[0], server: jid.split('@')[1] }
}

module.exports = { jidDecode }