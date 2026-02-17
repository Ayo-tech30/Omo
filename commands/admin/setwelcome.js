module.exports = {
  name: 'setwelcome',
  aliases: [],
  category: 'admin',
  description: 'Set welcome message',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "✅ Welcome message set!" });
    } catch (error) {
      console.error('setwelcome error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
