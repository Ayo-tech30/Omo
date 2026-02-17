module.exports = {
  name: 'leave',
  aliases: [],
  category: 'admin',
  description: 'Toggle leave message',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "👋 Leave message toggled!" });
    } catch (error) {
      console.error('leave error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
