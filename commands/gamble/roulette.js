module.exports = {
  name: 'roulette',
  aliases: [],
  category: 'gamble',
  description: 'Roulette',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎰 Roulette - Coming soon!" });
    } catch (error) {
      console.error('roulette error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
