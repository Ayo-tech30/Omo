module.exports = {
  name: 'perplexity',
  aliases: [],
  category: 'ai',
  description: 'Perplexity AI',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔍 Perplexity - Coming soon!

Usage: .perplexity <question>" });
    } catch (error) {
      console.error('perplexity error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
