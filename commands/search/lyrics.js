module.exports = {
  name: 'lyrics',
  aliases: [],
  category: 'search',
  description: 'Get song lyrics',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎵 Lyrics - Coming soon!

Usage: .lyrics <song name>" });
    } catch (error) {
      console.error('lyrics error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
