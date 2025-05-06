function jidNormalizedUser(jid) {
    if (typeof jid !== 'string') {
        throw new TypeError('JID must be a string');
    }

    const [localAndDomain, ] = jid.split('/');
    const [local, domain] = localAndDomain.split('@');

    if (!local || !domain) {
        throw new Error('Invalid JID format');
    }

    return `${local}@${domain.toLowerCase()}`;
}

module.exports = jidNormalizedUser;