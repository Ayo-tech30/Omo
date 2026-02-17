module.exports = {
  name: 'neko',
  aliases: [],
  category: 'anime',
  description: 'Random neko',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🐱 Neko - Coming soon!" });
    } catch (error) {
      console.error('neko error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
