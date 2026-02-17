const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What do you call a fake noodle? An impasta!",
  "Why did the bicycle fall over? It was two tired!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why couldn't the bicycle stand up? It was two tired!",
  "What did the ocean say to the beach? Nothing, it just waved!",
  "Why did the math book look sad? Because it had too many problems!",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
  "What do you call a fish wearing a bowtie? Sofishticated!",
  "Why don't skeletons fight each other? They don't have the guts!",
  "What did one wall say to the other? I'll meet you at the corner!",
  "Why was the math book sad? It had too many problems!"
];

module.exports = {
  name: 'joke',
  aliases: [],
  category: 'fun',
  description: 'Get a random joke',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

      await sock.sendMessage(sender, {
        text: `😂 *Random Joke*\n\n${randomJoke}`
      });
    } catch (error) {
      console.error('Joke error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to fetch joke!'
      });
    }
  }
};
