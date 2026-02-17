module.exports = {
  name: 'inactive',
  aliases: [],
  category: 'admin',
  description: 'Inactive members',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💤 Inactive - Coming soon!" });
    } catch (error) {
      console.error('inactive error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
