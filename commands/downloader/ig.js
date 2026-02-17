module.exports = {
  name: 'ig',
  aliases: ["instagram"],
  category: 'downloader',
  description: 'Instagram downloader',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📸 Instagram downloader - Coming soon!

Usage: .ig <url>" });
    } catch (error) {
      console.error('ig error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
