module.exports = {
  name: 'active',
  aliases: [],
  category: 'admin',
  description: 'Most active',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔥 Most active - Coming soon!" });
    } catch (error) {
      console.error('active error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
