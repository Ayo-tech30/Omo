module.exports = {
  name: 'imagine',
  aliases: [],
  category: 'ai',
  description: 'AI Image generation',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎨 AI Image - Coming soon!

Usage: .imagine <prompt>" });
    } catch (error) {
      console.error('imagine error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
