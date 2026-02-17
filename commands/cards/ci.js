module.exports = {
  name: 'ci',
  aliases: ["cardinfo"],
  category: 'cards',
  description: 'Card info',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Card info - Coming soon!" });
    } catch (error) {
      console.error('ci error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
