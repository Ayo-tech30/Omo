module.exports = {
  name: 'maid',
  aliases: [],
  category: 'anime',
  description: 'Maid pics',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "👩‍🦰 Maid - Coming soon!" });
    } catch (error) {
      console.error('maid error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
