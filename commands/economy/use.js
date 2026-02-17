module.exports = {
  name: 'use',
  aliases: [],
  category: 'economy',
  description: 'Use an item',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📦 Item used!" });
    } catch (error) {
      console.error('use error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
