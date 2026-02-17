module.exports = {
  name: 'tovid',
  aliases: ["tovideo"],
  category: 'converter',
  description: 'Convert to video',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎥 Convert to video - Coming soon!" });
    } catch (error) {
      console.error('tovid error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
