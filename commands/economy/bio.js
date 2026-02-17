module.exports = {
  name: 'bio',
  aliases: [],
  category: 'economy',
  description: 'Set bio',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📖 Bio updated!" });
    } catch (error) {
      console.error('bio error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
