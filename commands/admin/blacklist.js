module.exports = {
  name: 'blacklist',
  aliases: [],
  category: 'admin',
  description: 'Blacklist management',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🚫 Blacklist - Coming soon!" });
    } catch (error) {
      console.error('blacklist error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
