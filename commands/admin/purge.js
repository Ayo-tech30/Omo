module.exports = {
  name: 'purge',
  aliases: [],
  category: 'admin',
  description: 'Purge messages',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🗑️ Purge - Coming soon!" });
    } catch (error) {
      console.error('purge error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
