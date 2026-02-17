module.exports = {
  name: 'lottery',
  aliases: [],
  category: 'economy',
  description: 'Buy lottery ticket',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎫 Lottery - Coming soon!" });
    } catch (error) {
      console.error('lottery error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
