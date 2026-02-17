module.exports = {
  name: 'play',
  aliases: [],
  category: 'downloader',
  description: 'Play audio from YouTube',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎵 Play - Coming soon!

Usage: .play <song name>" });
    } catch (error) {
      console.error('play error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
