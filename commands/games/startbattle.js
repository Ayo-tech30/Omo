module.exports = {
  name: 'startbattle',
  aliases: [],
  category: 'games',
  description: 'Start battle',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚔️ Battle system - Coming soon!" });
    } catch (error) {
      console.error('startbattle error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
