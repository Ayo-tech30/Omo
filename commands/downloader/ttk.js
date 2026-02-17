module.exports = {
  name: 'ttk',
  aliases: ["tiktok"],
  category: 'downloader',
  description: 'TikTok downloader',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎵 TikTok downloader - Coming soon!

Usage: .ttk <url>" });
    } catch (error) {
      console.error('ttk error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
