const { isGroupAdmin, isBotAdmin } = require('../../utils');

module.exports = {
  name: 'delete',
  aliases: ['del'],
  category: 'admin',
  description: 'Delete a message',
  groupOnly: true,
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const isAdmin = await isGroupAdmin(sock, sender, userJid);
      if (!isAdmin) {
        return await sock.sendMessage(sender, { text: '❌ Admin only!' });
      }

      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted) {
        return await sock.sendMessage(sender, { text: '❌ Reply to a message to delete it!' });
      }

      const quotedKey = msg.message.extendedTextMessage.contextInfo.stanzaId;
      const quotedParticipant = msg.message.extendedTextMessage.contextInfo.participant;

      await sock.sendMessage(sender, {
        delete: {
          remoteJid: sender,
          fromMe: false,
          id: quotedKey,
          participant: quotedParticipant
        }
      });
    } catch (error) {
      console.error('Delete error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to delete!' });
    }
  }
};
