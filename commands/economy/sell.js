module.exports = {
  name: 'sell',
  aliases: [],
  category: 'economy',
  description: 'Sell an item',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💵 Item sold!" });
    } catch (error) {
      console.error('sell error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
