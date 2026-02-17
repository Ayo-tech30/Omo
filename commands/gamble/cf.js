const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'cf',
  aliases: ['coinflip'],
  category: 'gamble',
  description: 'Flip a coin',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);
      if (!user.registered) {
        return await sock.sendMessage(sender, { text: '❌ Register first! Use .reg' });
      }

      if (args.length < 2) {
        return await sock.sendMessage(sender, { text: '❌ Usage: .cf <heads/tails> <amount>' });
      }

      const choice = args[0].toLowerCase();
      const bet = parseInt(args[1]);

      if (!['heads', 'tails', 'h', 't'].includes(choice)) {
        return await sock.sendMessage(sender, { text: '❌ Choose heads or tails!' });
      }

      if (isNaN(bet) || bet <= 0) {
        return await sock.sendMessage(sender, { text: '❌ Invalid amount!' });
      }

      if (bet > user.balance) {
        return await sock.sendMessage(sender, { text: `❌ Insufficient balance!\n\n💰 Balance: $${formatNumber(user.balance)}` });
      }

      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      const userChoice = choice === 'h' ? 'heads' : choice === 't' ? 'tails' : choice;
      const won = result === userChoice;

      if (won) {
        user.balance += bet;
      } else {
        user.balance -= bet;
      }

      await db.setUser(userJid, user);

      const cfText = `🪙 *COINFLIP*

Your choice: ${userChoice}
Result: ${result}

${won ? `✅ You won $${formatNumber(bet)}!` : `❌ You lost $${formatNumber(bet)}!`}

💰 Balance: $${formatNumber(user.balance)}`;

      await sock.sendMessage(sender, { text: cfText });
    } catch (error) {
      console.error('Coinflip error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed!' });
    }
  }
};
