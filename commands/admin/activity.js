module.exports = {
  name: 'activity',
  aliases: [],
  category: 'admin',
  description: 'View activity',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📊 Activity - Coming soon!" });
    } catch (error) {
      console.error('activity error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
