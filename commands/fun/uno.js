module.exports = {
  name: 'uno',
  aliases: [],
  category: 'fun',
  description: 'UNO game',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 UNO - Coming soon!" });
    } catch (error) {
      console.error('uno error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
