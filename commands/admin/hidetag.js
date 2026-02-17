const { isGroupAdmin } = require('../../utils');

module.exports = {
  name: 'hidetag',
  aliases: ['ht'],
  category: 'admin',
  description: 'Send a message that tags everyone invisibly',
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

      if (args.length === 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please provide a message!\n\nUsage: .hidetag <message>'
        });
      }

      const message = args.join(' ');

      // Get all participants
      const groupMetadata = await sock.groupMetadata(sender);
      const participants = groupMetadata.participants.map(p => p.id);

      // Send message with hidden mentions
      await sock.sendMessage(sender, {
        text: message,
        mentions: participants
      });
    } catch (error) {
      console.error('Hidetag error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to send message!'
      });
    }
  }
};
