const fs = require('fs');
const path = require('path');

class CommandHandler {
  constructor() {
    this.commands = new Map();
    this.aliases = new Map();
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const categories = fs.readdirSync(commandsPath);

    let commandCount = 0;

    for (const category of categories) {
      const categoryPath = path.join(commandsPath, category);
      
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        try {
          const command = require(path.join(categoryPath, file));
          
          if (!command.name) continue;

          this.commands.set(command.name, command);
          commandCount++;

          // Register aliases
          if (command.aliases && Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
              this.aliases.set(alias, command.name);
            }
          }
        } catch (error) {
          console.error(`Error loading command ${file}:`, error);
        }
      }
    }

    console.log(`✅ Loaded ${commandCount} commands`);
  }

  getCommand(name) {
    // Check if it's a command name
    if (this.commands.has(name)) {
      return this.commands.get(name);
    }

    // Check if it's an alias
    if (this.aliases.has(name)) {
      const commandName = this.aliases.get(name);
      return this.commands.get(commandName);
    }

    return null;
  }

  async handleCommand(sock, msg, commandName, args) {
    const command = this.getCommand(commandName);

    if (!command) return false;

    try {
      // Check if group only
      if (command.groupOnly && !msg.key.remoteJid.endsWith('@g.us')) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: '❌ This command can only be used in groups!'
        });
        return true;
      }

      // Execute command
      await command.execute(sock, msg, args);
      return true;
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ An error occurred while executing the command!'
      });
      return true;
    }
  }
}

module.exports = new CommandHandler();
