module.exports = {
  name: 'gpt',
  aliases: [],
  category: 'ai',
  description: 'ChatGPT',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🤖 ChatGPT - Coming soon!

Usage: .gpt <question>" });
    } catch (error) {
      console.error('gpt error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
