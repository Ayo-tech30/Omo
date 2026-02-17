module.exports = {
  name: 'rotate',
  aliases: [],
  category: 'converter',
  description: 'Rotate image',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔄 Rotate - Coming soon!" });
    } catch (error) {
      console.error('rotate error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
