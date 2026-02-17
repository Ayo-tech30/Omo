module.exports = {
  name: 'ping',
  aliases: [],
  category: 'general',
  description: 'Check bot response time',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const start = Date.now();
    
    const sentMsg = await sock.sendMessage(sender, { text: '⏳ Pinging...' });
    const end = Date.now();
    const latency = end - start;

    await sock.sendMessage(sender, {
      text: `🏓 Pong!\n⏱️ Response Time: ${latency}ms`,
      edit: sentMsg.key
    });
  }
};
