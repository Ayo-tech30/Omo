module.exports = {
  name: 'gen',
  aliases: [],
  category: 'fun',
  description: 'Generate something',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎲 Generator - Coming soon!" });
    } catch (error) {
      console.error('gen error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
