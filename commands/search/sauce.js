module.exports = {
  name: 'sauce',
  aliases: ["reverseimg"],
  category: 'search',
  description: 'Reverse image search',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔍 Reverse search - Coming soon!" });
    } catch (error) {
      console.error('sauce error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
