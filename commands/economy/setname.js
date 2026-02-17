module.exports = {
  name: 'setname',
  aliases: [],
  category: 'economy',
  description: 'Set your name',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📝 Use .rename <name>" });
    } catch (error) {
      console.error('setname error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
