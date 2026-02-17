module.exports = {
  name: 'x',
  aliases: ["twitter"],
  category: 'downloader',
  description: 'X/Twitter downloader',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🐦 X downloader - Coming soon!

Usage: .x <url>" });
    } catch (error) {
      console.error('x error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
