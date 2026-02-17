const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'profile',
  aliases: ['p'],
  category: 'economy',
  description: 'View your profile',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);

      if (!user.registered) {
        return await sock.sendMessage(sender, {
          text: '❌ You are not registered! Use .reg to register first.'
        });
      }

      const registeredDate = user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'Unknown';

      const profileText = `╭─「 👤 *PROFILE* 」
│
│ 📝 Name: ${user.name || 'Not set'}
│ 🎂 Age: ${user.age || 'Not set'}
│ 📖 Bio: ${user.bio || 'Not set'}
│
│ 💰 Wallet: $${formatNumber(user.balance)}
│ 🏦 Bank: $${formatNumber(user.bankBalance)}
│ 💎 Orbs: ${formatNumber(user.orbs || 0)}
│
│ 🎴 Cards: ${user.cards?.length || 0}
│ 🎒 Items: ${user.inventory?.length || 0}
│
│ ⏰ Registered: ${registeredDate}
│ ⚠️ Warnings: ${user.warnings || 0}
│
╰───────────────`;

      await sock.sendMessage(sender, { text: profileText });
    } catch (error) {
      console.error('Profile error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to fetch profile!'
      });
    }
  }
};
