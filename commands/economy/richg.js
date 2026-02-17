module.exports = {
  name: 'richg',
  aliases: [],
  category: 'economy',
  description: 'Group leaderboard',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🏆 Group leaderboard - Coming soon!" });
    } catch (error) {
      console.error('richg error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
