# Violet (Nexora) - WhatsApp Bot

Advanced WhatsApp bot with **138+ commands** including economy system, card collection, games, and more!

## Features

- 🎴 **Card Collection System** - Collect and trade anime cards
- 💰 **Economy System** - Earn, save, and trade virtual currency
- 🎮 **Games** - Multiple interactive games
- 🎰 **Gambling** - Slots, dice, roulette, and more
- 🤖 **AI Integration** - GPT, image generation, and more
- 📲 **Media Downloaders** - Download from Instagram, TikTok, YouTube, etc.
- ⚙️ **Admin Tools** - Complete group management
- 🔄 **Sticker Creator** - Convert media to stickers with custom pack names

## Setup Instructions

### 1. Deploy on Replit

1. Create a new Replit project
2. Upload all files from the zip
3. Click "Run" to start the bot

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > Service Accounts
5. Click "Generate New Private Key"
6. Copy the credentials to Replit Secrets:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

### 3. Connect WhatsApp

1. Run the bot
2. Scan the QR code with WhatsApp
3. Bot is now connected!

## Configuration

Edit `config.js` to customize:

- **Owner Number**: Your WhatsApp number
- **Bot Name**: Display name
- **Prefix**: Command prefix (default: .)
- **Sticker Pack**: Default sticker pack name and author

## Commands

### General
- `.menu` - Display all commands
- `.ping` - Check bot response time
- `.mods` - View staff members

### Stickers
- `.sticker` or `.s` - Convert media to sticker
- `.take <name>, <author>` - Change sticker pack info

### Economy
- `.reg` - Register for economy features
- `.balance` / `.bal` - Check your balance
- `.daily` - Claim daily reward
- `.profile` / `.p` - View your profile

### Admin (Group)
- `.tagall [message]` - Tag all members
- `.kick @user` - Kick a member
- `.promote @user` - Promote to admin
- `.demote @user` - Demote from admin
- `.antilink on/off` - Toggle antilink protection

### Staff Only
- `.join <invite_link>` - Join a group
- `.addmod @user` - Add moderator (owner only)
- `.addguardian @user` - Add guardian (owner only)

## Owner Configuration

The owner number is set in `config.js`:

```javascript
OWNER_NUMBER: '2349049460676@s.whatsapp.net'
```

The owner NEVER sees permission errors and has full access to all commands.

## Critical Features

### Error Handling
- ✅ NO error messages for media sent without commands
- ✅ Only shows errors when actual commands fail
- ✅ Ignores old messages (5-minute timeout)

### Sticker System
- Default pack: "Kumoko"
- Default author: "𝚴𝚵𝚾𝚯𝚪𝚫"
- `.take` format: `.take <name>, <author>` (comma-separated)

## File Structure

```
nexora-bot/
├── index.js              # Main bot file
├── config.js             # Configuration
├── database.js           # Firebase database handler
├── commandHandler.js     # Command loader
├── sticker.js           # Sticker handler
├── utils.js             # Utility functions
├── commands/
│   ├── general/         # General commands
│   ├── sticker/         # Sticker commands
│   ├── economy/         # Economy commands
│   ├── admin/           # Admin commands
│   ├── games/           # Game commands
│   ├── fun/             # Fun commands
│   └── ai/              # AI commands
├── auth/                # WhatsApp auth (auto-generated)
└── temp/                # Temporary files

```

## Dependencies

All dependencies are listed in `package.json`:

- `@whiskeysockets/baileys` - WhatsApp Web API
- `firebase-admin` - Firebase database
- `sharp` - Image processing
- `fluent-ffmpeg` - Video processing
- And more...

## Support

For issues or questions, contact the owner.

## Credits

Created by **KYNX** for the Nexora community.

---

**Nexora** - Powered by love ꨄ︎
