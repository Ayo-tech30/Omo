const db = require('../../database');

module.exports = {
  name: 'inventory',
  aliases: ['inv', 'bag'],
  category: 'economy',
  description: 'View your inventory',
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

      if (!user.inventory || user.inventory.length === 0) {
        return await sock.sendMessage(sender, {
          text: '🎒 *Your Inventory*\n\nYour inventory is empty!\nVisit .shop to buy items.'
        });
      }

      const itemCounts = {};
      user.inventory.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
      });

      const inventoryText = `🎒 *Your Inventory*

${Object.entries(itemCounts).map(([item, count]) => `• ${item} x${count}`).join('\n')}

Total items: ${user.inventory.length}`;

      await sock.sendMessage(sender, { text: inventoryText });
    } catch (error) {
      console.error('Inventory error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to fetch inventory!'
      });
    }
  }
};
