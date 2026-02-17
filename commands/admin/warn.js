module.exports = {
  name: 'warn',
  aliases: [],
  category: 'admin',
  description: 'Warn a user',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ User warned!" });
    } catch (error) {
      console.error('warn error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
