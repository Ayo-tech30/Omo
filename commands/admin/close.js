module.exports = {
  name: 'close',
  aliases: [],
  category: 'admin',
  description: 'Close group',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔒 Group closed!" });
    } catch (error) {
      console.error('close error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
