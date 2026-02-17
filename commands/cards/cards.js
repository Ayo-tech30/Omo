module.exports = {
  name: 'cards',
  aliases: [],
  category: 'cards',
  description: 'Toggle card spawning',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎴 Card spawning toggled!" });
    } catch (error) {
      console.error('cards error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
