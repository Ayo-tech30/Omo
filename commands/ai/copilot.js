module.exports = {
  name: 'copilot',
  aliases: [],
  category: 'ai',
  description: 'Copilot AI',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🤖 Copilot AI - Coming soon!

Usage: .copilot <question>" });
    } catch (error) {
      console.error('copilot error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
