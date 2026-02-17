const truths = [
  "What's the most embarrassing thing you've done?",
  "Have you ever lied to your best friend?",
  "What's your biggest fear?",
  "Have you ever cheated on a test?",
  "What's your biggest secret?",
  "Who was your first crush?",
  "What's the worst thing you've ever said to someone?",
  "Have you ever broken the law?",
  "What's your most embarrassing moment?",
  "If you could be invisible, what would you do?"
];

module.exports = {
  name: 'truth',
  category: 'fun',
  async execute(sock, msg, args) {
    const truth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `❓ *TRUTH*\n\n${truth}` });
  }
};
