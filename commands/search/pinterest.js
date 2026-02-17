module.exports = {
  name: 'pinterest',
  aliases: ["pint"],
  category: 'search',
  description: 'Pinterest search',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📌 Pinterest - Coming soon!

Usage: .pinterest <query>" });
    } catch (error) {
      console.error('pinterest error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
