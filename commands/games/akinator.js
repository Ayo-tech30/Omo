module.exports = {
  name: 'akinator',
  aliases: ["aki"],
  category: 'games',
  description: 'Play Akinator',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔮 Akinator - Coming soon!" });
    } catch (error) {
      console.error('akinator error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
