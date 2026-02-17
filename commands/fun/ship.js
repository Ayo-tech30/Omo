const { extractMentions } = require('../../utils');

module.exports = {
  name: 'ship',
  aliases: [],
  category: 'fun',
  description: 'Ship two people together',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const mentions = extractMentions(msg.message);

      if (mentions.length < 2) {
        return await sock.sendMessage(sender, {
          text: '❌ Please mention two people to ship!\n\nUsage: .ship @user1 @user2'
        });
      }

      const user1 = mentions[0];
      const user2 = mentions[1];

      // Calculate ship percentage
      const percentage = Math.floor(Math.random() * 101);

      let emoji = '💔';
      let status = 'Incompatible';

      if (percentage >= 80) {
        emoji = '💕';
        status = 'Perfect Match!';
      } else if (percentage >= 60) {
        emoji = '💖';
        status = 'Great Match!';
      } else if (percentage >= 40) {
        emoji = '💗';
        status = 'Good Match';
      } else if (percentage >= 20) {
        emoji = '💙';
        status = 'Could Work';
      }

      const shipText = `${emoji} *SHIP METER* ${emoji}

@${user1.split('@')[0]} ❤️ @${user2.split('@')[0]}

━━━━━━━━━━━━━━━
${'█'.repeat(Math.floor(percentage / 5))}${'░'.repeat(20 - Math.floor(percentage / 5))}
━━━━━━━━━━━━━━━

💘 ${percentage}% - ${status}`;

      await sock.sendMessage(sender, {
        text: shipText,
        mentions: [user1, user2]
      });
    } catch (error) {
      console.error('Ship error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to ship users!'
      });
    }
  }
};
