module.exports = {
  name: 'open',
  aliases: [],
  category: 'admin',
  description: 'Open group',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔓 Group opened!" });
    } catch (error) {
      console.error('open error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
