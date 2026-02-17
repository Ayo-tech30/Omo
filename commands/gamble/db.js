module.exports = {
  name: 'db',
  aliases: [],
  category: 'gamble',
  description: 'Dice battle',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎲 Dice battle - Coming soon!" });
    } catch (error) {
      console.error('db error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
