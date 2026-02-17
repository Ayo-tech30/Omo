module.exports = {
  name: 'card',
  aliases: [],
  category: 'cards',
  description: 'View card details',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Card system - Coming soon!" });
    } catch (error) {
      console.error('card error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
