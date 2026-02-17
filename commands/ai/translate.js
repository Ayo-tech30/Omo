module.exports = {
  name: 'translate',
  aliases: ["tt"],
  category: 'ai',
  description: 'Translate text',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🌐 Translate - Coming soon!

Usage: .translate <text>" });
    } catch (error) {
      console.error('translate error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
