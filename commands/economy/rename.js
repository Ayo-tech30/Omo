module.exports = {
  name: 'rename',
  aliases: [],
  category: 'economy',
  description: 'Rename yourself',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📝 Name changed!" });
    } catch (error) {
      console.error('rename error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
