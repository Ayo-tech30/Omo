const { isGroupAdmin, isBotAdmin, extractMentions } = require('../../utils');

module.exports = {
  name: 'demote',
  aliases: [],
  category: 'admin',
  description: 'Demote an admin to member',
  groupOnly: true,
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const isAdmin = await isGroupAdmin(sock, sender, userJid);
      if (!isAdmin) {
        return await sock.sendMessage(sender, { text: '❌ Admin only!' });
      }

      const botIsAdmin = await isBotAdmin(sock, sender);
      if (!botIsAdmin) {
        return await sock.sendMessage(sender, { text: '❌ I need to be admin!' });
      }

      const mentions = extractMentions(msg.message);
      if (mentions.length === 0) {
        return await sock.sendMessage(sender, { text: '❌ Mention someone!\n\nUsage: .demote @user' });
      }

      const targetJid = mentions[0];

      await sock.groupParticipantsUpdate(sender, [targetJid], 'demote');

      await sock.sendMessage(sender, {
        text: `✅ Demoted @${targetJid.split('@')[0]} to member!`,
        mentions: [targetJid]
      });
    } catch (error) {
      console.error('Demote error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to demote!' });
    }
  }
};
