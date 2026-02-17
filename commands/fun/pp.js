module.exports = {
  name: 'pp',
  aliases: [],
  category: 'fun',
  description: 'PP size',
  async execute(sock, msg, args) {
    try {
      const size = Math.floor(Math.random() * 20); await sock.sendMessage(msg.key.remoteJid, { text: `🍆 PP Size: ${'='.repeat(size)}D (${size}cm)` });
    } catch (error) {
      console.error('pp error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
