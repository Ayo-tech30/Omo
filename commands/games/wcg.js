module.exports = {
  name: 'wcg',
  aliases: [],
  category: 'games',
  description: 'Word Chain Game',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📝 Word Chain - Coming soon!" });
    } catch (error) {
      console.error('wcg error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
