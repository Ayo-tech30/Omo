module.exports = {
  name: 'yt',
  aliases: ["youtube"],
  category: 'downloader',
  description: 'YouTube downloader',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📺 YouTube downloader - Coming soon!

Usage: .yt <url>" });
    } catch (error) {
      console.error('yt error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
