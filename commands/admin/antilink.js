module.exports = {
  name: 'antilink',
  aliases: [],
  category: 'admin',
  description: 'Toggle antilink',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔗 Antilink toggled!" });
    } catch (error) {
      console.error('antilink error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
