const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'dice',
  aliases: ['roll'],
  category: 'gamble',
  description: 'Roll dice',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);
      if (!user.registered) {
        return await sock.sendMessage(sender, { text: '❌ Register first! Use .reg' });
      }

      if (args.length === 0) {
        return await sock.sendMessage(sender, { text: '❌ Usage: .dice <amount>' });
      }

      const bet = parseInt(args[0]);
      if (isNaN(bet) || bet <= 0) {
        return await sock.sendMessage(sender, { text: '❌ Invalid amount!' });
      }

      if (bet > user.balance) {
        return await sock.sendMessage(sender, { text: `❌ Insufficient balance!\n\n💰 Balance: $${formatNumber(user.balance)}` });
      }

      const userRoll = Math.floor(Math.random() * 6) + 1;
      const botRoll = Math.floor(Math.random() * 6) + 1;

      let winnings = 0;
      let result = '';

      if (userRoll > botRoll) {
        winnings = bet;
        result = 'You Win!';
      } else if (userRoll < botRoll) {
        winnings = -bet;
        result = 'You Lose!';
      } else {
        winnings = 0;
        result = 'Draw!';
      }

      user.balance += winnings;
      await db.setUser(userJid, user);

      const diceText = `🎲 *DICE ROLL*

Your Roll: ${userRoll}
Bot Roll: ${botRoll}

${result}
${winnings > 0 ? `✅ Won: $${formatNumber(winnings)}` : winnings < 0 ? `❌ Lost: $${formatNumber(Math.abs(winnings))}` : '🤝 No change'}

💰 Balance: $${formatNumber(user.balance)}`;

      await sock.sendMessage(sender, { text: diceText });
    } catch (error) {
      console.error('Dice error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed!' });
    }
  }
};
