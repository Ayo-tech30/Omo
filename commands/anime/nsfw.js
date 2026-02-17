module.exports = {
  name: 'nsfw',
  aliases: [],
  category: 'anime',
  description: 'Toggle NSFW',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔞 NSFW toggled!" });
    } catch (error) {
      console.error('nsfw error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
