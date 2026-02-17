module.exports = {
  name: 'crusade',
  aliases: [],
  category: 'interaction',
  description: 'Crusade',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚔️ Crusade - Coming soon!" });
    } catch (error) {
      console.error('crusade error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
