module.exports = {
  name: 'col',
  aliases: ["collection"],
  category: 'cards',
  description: 'View collection',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Collection - Coming soon!" });
    } catch (error) {
      console.error('col error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
