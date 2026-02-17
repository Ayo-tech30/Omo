module.exports = {
  name: 'antism',
  aliases: [],
  category: 'admin',
  description: 'Toggle anti-sticker spam',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Anti-sticker spam toggled!" });
    } catch (error) {
      console.error('antism error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
