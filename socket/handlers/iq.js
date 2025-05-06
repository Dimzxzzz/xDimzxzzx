function handleIQ(iqNode) {
  console.log('IQ node:', iqNode)
}

module.exports = handleIQ

socket/handlers/presence.js

function handlePresence(presence) {
  console.log('Presence update:', presence)
}

module.exports = handlePresence

socket/handlers/receipt.js

function handleReceipt(receipt) {
  console.log('Message receipt:', receipt)
}

module.exports = handleReceipt