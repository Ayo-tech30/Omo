const { isGroupAdmin, isBotAdmin, extractMentions } = require('../../utils');

module.exports = {
  name: 'promote',
  aliases: [],
  category: 'admin',
  description: 'Promote a member to admin',
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
        return await sock.sendMessage(sender, { text: '❌ Mention someone!\n\nUsage: .promote @user' });
      }

      const targetJid = mentions[0];

      await sock.groupParticipantsUpdate(sender, [targetJid], 'promote');

      await sock.sendMessage(sender, {
        text: `✅ Promoted @${targetJid.split('@')[0]} to admin!`,
        mentions: [targetJid]
      });
    } catch (error) {
      console.error('Promote error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to promote!' });
    }
  }
};
