module.exports = {
  name: 'wouldyourather',
  aliases: ["wyr"],
  category: 'fun',
  description: 'Would you rather',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "❓ Would you rather - Coming soon!" });
    } catch (error) {
      console.error('wouldyourather error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
