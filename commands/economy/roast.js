module.exports = {
  name: 'roast',
  aliases: [],
  category: 'economy',
  description: 'Roast someone',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔥 Roasting feature - Coming soon!" });
    } catch (error) {
      console.error('roast error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
