function jidDecode(jid) {
    const regex = /^(.+?)@(.+)$/;
    const match = jid.match(regex);
    if (!match) return null;
    return { user: match[1], server: match[2] };
}

class MessageRetryMap extends Map {
    incrementRetry(jid, messageId) {
        const key = `${jid}_${messageId}`;
        const retries = this.get(key) || 0;
        this.set(key, retries + 1);
        return this.get(key);
    }

    getRetryCount(jid, messageId) {
        return this.get(`${jid}_${messageId}`) || 0;
    }
}

function makeCacheableSignalKeyStore(signalKeyStore) {
    const cache = {};

    return {
        async get(key, defaultValue) {
            if (cache[key]) return cache[key];
            const value = await signalKeyStore.get(key);
            cache[key] = value || defaultValue;
            return cache[key];
        },
        async set(key, value) {
            cache[key] = value;
            return signalKeyStore.set(key, value);
        },
        async delete(key) {
            delete cache[key];
            return signalKeyStore.delete(key);
        },
        async clear() {
            Object.keys(cache).forEach(k => delete cache[k]);
            return signalKeyStore.clear();
        },
    };
}

module.exports = { makeCacheableSignalKeyStore };

function generateForwardMessageContent(message, forceForward = false) {
    const forwardCount = (message.forwardingScore || 0) + 1;
    return {
        ...message,
        forwardingScore: forwardCount,
        isForwarded: forceForward || forwardCount > 1
    };
}

async function fetchLatestWaWebVersion() {
    try {
        const response = await axios.get('https://web.whatsapp.com/check-update?version=1&platform=web');
        return response.data; // you might want to extract a specific field
    } catch (err) {
        console.error('Failed to fetch WA Web version:', err);
        return null;
    }
}

function getAggregateVotesInPollMessage(message) {
    if (!message.pollUpdates) return null;
    const voteCounts = {};
    for (const update of message.pollUpdates) {
        for (const vote of update.votes) {
            voteCounts[vote] = (voteCounts[vote] || 0) + 1;
        }
    }
    return voteCounts;
}

function extractMessageContent(message) {
    const contentTypes = ['conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage', 'documentMessage'];
    for (const type of contentTypes) {
        if (message[type]) {
            return message[type];
        }
    }
    return null;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    jidDecode,
    MessageRetryMap,
    generateForwardMessageContent,
    makeCacheableSignalKeyStore,
    fetchLatestWaWebVersion,
    getAggregateVotesInPollMessage,
    extractMessageContent,
    delay
};
