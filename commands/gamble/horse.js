module.exports = {
  name: 'horse',
  aliases: [],
  category: 'gamble',
  description: 'Horse racing',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🐎 Horse racing - Coming soon!" });
    } catch (error) {
      console.error('horse error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
