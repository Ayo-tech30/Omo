module.exports = {
  name: 'donate',
  aliases: [],
  category: 'economy',
  description: 'Donate money',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💰 Donation system - Coming soon!" });
    } catch (error) {
      console.error('donate error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
