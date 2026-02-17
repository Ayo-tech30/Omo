module.exports = {
  name: 'setage',
  aliases: [],
  category: 'economy',
  description: 'Set age',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎂 Age updated!" });
    } catch (error) {
      console.error('setage error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
