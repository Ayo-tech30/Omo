module.exports = {
  name: 'claim',
  aliases: [],
  category: 'cards',
  description: 'Claim spawned card',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Claim card - Coming soon!" });
    } catch (error) {
      console.error('claim error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
