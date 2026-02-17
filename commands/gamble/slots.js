const db = require('../../database');
const { formatNumber } = require('../../utils');

const slots = ['🍒', '🍋', '🍊', '🍉', '⭐', '💎', '7️⃣'];

module.exports = {
  name: 'slots',
  aliases: ['slot'],
  category: 'gamble',
  description: 'Play slot machine',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);
      if (!user.registered) {
        return await sock.sendMessage(sender, { text: '❌ Register first! Use .reg' });
      }

      if (args.length === 0) {
        return await sock.sendMessage(sender, { text: '❌ Usage: .slots <amount>' });
      }

      const bet = parseInt(args[0]);
      if (isNaN(bet) || bet <= 0) {
        return await sock.sendMessage(sender, { text: '❌ Invalid amount!' });
      }

      if (bet > user.balance) {
        return await sock.sendMessage(sender, { text: `❌ Insufficient balance!\n\n💰 Balance: $${formatNumber(user.balance)}` });
      }

      const slot1 = slots[Math.floor(Math.random() * slots.length)];
      const slot2 = slots[Math.floor(Math.random() * slots.length)];
      const slot3 = slots[Math.floor(Math.random() * slots.length)];

      let winnings = 0;
      let result = '';

      if (slot1 === slot2 && slot2 === slot3) {
        if (slot1 === '💎') {
          winnings = bet * 10;
          result = 'JACKPOT! 💎💎💎';
        } else if (slot1 === '7️⃣') {
          winnings = bet * 7;
          result = 'LUCKY 7s!';
        } else {
          winnings = bet * 3;
          result = 'WIN!';
        }
      } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        winnings = Math.floor(bet * 1.5);
        result = 'Small Win!';
      } else {
        winnings = -bet;
        result = 'Lost!';
      }

      user.balance += winnings;
      await db.setUser(userJid, user);

      const slotsText = `🎰 *SLOT MACHINE*

[ ${slot1} | ${slot2} | ${slot3} ]

${result}
${winnings >= 0 ? `✅ Won: $${formatNumber(winnings)}` : `❌ Lost: $${formatNumber(Math.abs(winnings))}`}

💰 Balance: $${formatNumber(user.balance)}`;

      await sock.sendMessage(sender, { text: slotsText });
    } catch (error) {
      console.error('Slots error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed!' });
    }
  }
};
