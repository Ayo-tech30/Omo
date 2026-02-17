module.exports = {
  name: 'chess',
  aliases: [],
  category: 'games',
  description: 'Play chess',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "♟️ Chess - Coming soon!" });
    } catch (error) {
      console.error('chess error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
