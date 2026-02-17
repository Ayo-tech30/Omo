module.exports = {
  name: 'shrug',
  aliases: [],
  category: 'interaction',
  description: 'Shrug',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🤷 ¯\_(ツ)_/¯" });
    } catch (error) {
      console.error('shrug error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
