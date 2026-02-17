module.exports = {
  name: 'social',
  aliases: [],
  category: 'fun',
  description: 'Social credit',
  async execute(sock, msg, args) {
    try {
      const sc = Math.floor(Math.random() * 1000) - 500; await sock.sendMessage(msg.key.remoteJid, { text: `🇨🇳 Social Credit: ${sc}` });
    } catch (error) {
      console.error('social error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
