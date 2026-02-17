module.exports = {
  name: 'relation',
  aliases: [],
  category: 'fun',
  description: 'Relationship',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💑 Relationship - Coming soon!" });
    } catch (error) {
      console.error('relation error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
