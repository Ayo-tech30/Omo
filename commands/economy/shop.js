module.exports = {
  name: 'shop',
  aliases: ['store'],
  category: 'economy',
  description: 'View the shop',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    const shopText = `🛒 *NEXORA SHOP*

┏━「 💎 ITEMS 」
┃ 1. 🎣 Fishing Rod - $500
┃ 2. ⛏️ Pickaxe - $500
┃ 3. 🍀 Luck Potion - $1,000
┃ 4. 💰 Money Bag - $2,000
┃ 5. 🎁 Mystery Box - $5,000
┃ 6. 🔮 Crystal Ball - $10,000
┃ 7. 👑 Crown - $50,000
┃ 8. 💍 Diamond Ring - $100,000
┗━━━━━━━━━━━━━❥❥❥

Use .buy <item_number> to purchase`;

    await sock.sendMessage(sender, { text: shopText });
  }
};
