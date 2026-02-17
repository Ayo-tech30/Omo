const db = require('../../database');
const { formatNumber } = require('../../utils');

// DIG COMMAND
const digCommand = {
  name: 'dig',
  aliases: [],
  category: 'economy',
  description: 'Dig for treasure',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);
      if (!user.registered) {
        return await sock.sendMessage(sender, { text: '❌ You are not registered! Use .reg to register first.' });
      }

      const now = Date.now();
      const cooldown = 120000; // 2 minutes

      if (user.lastDig && now - user.lastDig < cooldown) {
        const timeLeft = Math.ceil((cooldown - (now - user.lastDig)) / 1000);
        return await sock.sendMessage(sender, { text: `⏰ Wait ${timeLeft}s before digging again!` });
      }

      const amount = Math.floor(Math.random() * 300) + 100;
      user.balance += amount;
      user.lastDig = now;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `⛏️ You dug and found $${formatNumber(amount)}!\n\n💰 Balance: $${formatNumber(user.balance)}`
      });
    } catch (error) {
      console.error('Dig error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to dig!' });
    }
  }
};

module.exports = digCommand;
