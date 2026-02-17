module.exports = {
  name: 'welcome',
  aliases: [],
  category: 'admin',
  description: 'Toggle welcome',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "👋 Welcome toggled!" });
    } catch (error) {
      console.error('welcome error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
