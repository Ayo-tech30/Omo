module.exports = {
  name: 'dp',
  aliases: [],
  category: 'gamble',
  description: 'Dice pair',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎲 Dice pair - Coming soon!" });
    } catch (error) {
      console.error('dp error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
