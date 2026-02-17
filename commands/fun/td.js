module.exports = {
  name: 'td',
  aliases: [],
  category: 'fun',
  description: 'Truth or dare',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎯 Use .truth or .dare" });
    } catch (error) {
      console.error('td error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
