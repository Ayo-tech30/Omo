module.exports = {
  name: 'ebal',
  aliases: [],
  category: 'economy',
  description: 'Extended balance',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💰 Balance details - Coming soon!" });
    } catch (error) {
      console.error('ebal error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
