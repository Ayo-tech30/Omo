module.exports = {
  name: 'kill',
  aliases: [],
  category: 'interaction',
  description: 'Kill',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔪 Kill - Coming soon!" });
    } catch (error) {
      console.error('kill error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
