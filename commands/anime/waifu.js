module.exports = {
  name: 'waifu',
  aliases: [],
  category: 'anime',
  description: 'Random waifu',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "👧 Waifu - Coming soon!" });
    } catch (error) {
      console.error('waifu error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
