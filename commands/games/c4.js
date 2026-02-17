module.exports = {
  name: 'c4',
  aliases: ["connect4"],
  category: 'games',
  description: 'Connect 4',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔴🟡 Connect 4 - Coming soon!" });
    } catch (error) {
      console.error('c4 error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
