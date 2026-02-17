module.exports = {
  name: 'wallpaper',
  aliases: [],
  category: 'search',
  description: 'Search wallpapers',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🖼️ Wallpaper - Coming soon!

Usage: .wallpaper <query>" });
    } catch (error) {
      console.error('wallpaper error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
