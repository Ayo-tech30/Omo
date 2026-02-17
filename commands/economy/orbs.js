module.exports = {
  name: 'orbs',
  aliases: [],
  category: 'economy',
  description: 'Check orbs',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💎 You have 0 orbs" });
    } catch (error) {
      console.error('orbs error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
