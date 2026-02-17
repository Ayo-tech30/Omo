module.exports = {
  name: 'fb',
  aliases: ["facebook"],
  category: 'downloader',
  description: 'Facebook downloader',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📘 Facebook downloader - Coming soon!

Usage: .fb <url>" });
    } catch (error) {
      console.error('fb error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
