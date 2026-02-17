module.exports = {
  name: 'deck',
  aliases: [],
  category: 'cards',
  description: 'View your deck',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Your deck is empty!" });
    } catch (error) {
      console.error('deck error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
