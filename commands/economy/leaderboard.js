const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'leaderboard',
  aliases: ['lb', 'rich'],
  category: 'economy',
  description: 'View richest users',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      await sock.sendMessage(sender, {
        text: `🏆 *LEADERBOARD*\n\n📊 Feature coming soon!\n\nThis will show the richest users globally.`
      });
    } catch (error) {
      console.error('Leaderboard error:', error);
    }
  }
};
