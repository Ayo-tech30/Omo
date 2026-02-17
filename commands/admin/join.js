const { isStaff } = require('../../utils');

module.exports = {
  name: 'join',
  aliases: [],
  category: 'admin',
  description: 'Join a group via invite link (Staff only)',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      // Check if staff
      if (!(await isStaff(userJid))) {
        return await sock.sendMessage(sender, {
          text: '❌ This command is only for bot staff!'
        });
      }

      if (args.length === 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please provide a group invite link!\n\nUsage: .join <group_invite_link>'
        });
      }

      const inviteLink = args[0];
      
      // Extract invite code from link
      let inviteCode = inviteLink;
      if (inviteLink.includes('chat.whatsapp.com/')) {
        inviteCode = inviteLink.split('chat.whatsapp.com/')[1];
      }

      await sock.sendMessage(sender, { text: '⏳ Joining group...' });

      // Join group
      const result = await sock.groupAcceptInvite(inviteCode);

      await sock.sendMessage(sender, {
        text: `✅ Successfully joined the group!\n\nGroup ID: ${result}`
      });
    } catch (error) {
      console.error('Join error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to join group! Make sure the invite link is valid.'
      });
    }
  }
};
