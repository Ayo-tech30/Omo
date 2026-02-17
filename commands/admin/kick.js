const { isGroupAdmin, isBotAdmin, extractMentions } = require('../../utils');

module.exports = {
  name: 'kick',
  aliases: ['remove'],
  category: 'admin',
  description: 'Kick a member from the group',
  groupOnly: true,
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      // Check if user is admin
      const isAdmin = await isGroupAdmin(sock, sender, userJid);
      if (!isAdmin) {
        return await sock.sendMessage(sender, {
          text: '❌ This command is only for group admins!'
        });
      }

      // Check if bot is admin
      const botIsAdmin = await isBotAdmin(sock, sender);
      if (!botIsAdmin) {
        return await sock.sendMessage(sender, {
          text: '❌ I need to be an admin to kick members!'
        });
      }

      const mentions = extractMentions(msg.message);

      if (mentions.length === 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please mention a user to kick!\n\nUsage: .kick @user'
        });
      }

      const targetJid = mentions[0];

      // Check if target is admin
      const targetIsAdmin = await isGroupAdmin(sock, sender, targetJid);
      if (targetIsAdmin) {
        return await sock.sendMessage(sender, {
          text: '❌ Cannot kick an admin!'
        });
      }

      // Kick user
      await sock.groupParticipantsUpdate(sender, [targetJid], 'remove');

      await sock.sendMessage(sender, {
        text: `✅ Successfully kicked @${targetJid.split('@')[0]}!`,
        mentions: [targetJid]
      });
    } catch (error) {
      console.error('Kick error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to kick user!'
      });
    }
  }
};
