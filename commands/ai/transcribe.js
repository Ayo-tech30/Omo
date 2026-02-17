module.exports = {
  name: 'transcribe',
  aliases: ["tb"],
  category: 'ai',
  description: 'Transcribe audio',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🎤 Transcribe - Coming soon!" });
    } catch (error) {
      console.error('transcribe error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
