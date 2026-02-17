# Nexora Bot Installation Guide

## Quick Start (Replit)

### Step 1: Upload to Replit

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub" or "Upload folder"
4. Upload the entire `nexora-bot` folder

### Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select existing project
3. Enter project name (e.g., "nexora-bot")
4. Click "Create Project"

#### Enable Firestore:
1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select a location
5. Click "Enable"

#### Get Credentials:
1. Go to Project Settings (gear icon) > "Service Accounts"
2. Click "Generate New Private Key"
3. Download the JSON file

### Step 3: Add Secrets to Replit

1. In Replit, click on "Secrets" (🔒 icon in left sidebar)
2. Add the following secrets from your Firebase JSON:

```
FIREBASE_PROJECT_ID = your-project-id
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n
```

**Important**: For FIREBASE_PRIVATE_KEY, copy the entire key including:
- `-----BEGIN PRIVATE KEY-----`
- All the key content
- `-----END PRIVATE KEY-----`
- Keep the `\n` characters as-is

### Step 4: Run the Bot

1. In Replit, click the "Run" button
2. Wait for dependencies to install
3. You'll be prompted to enter your phone number
4. Enter phone number with country code (e.g., 2349049460676)
5. A **pairing code** will appear (e.g., ABCD-1234)

### Step 5: Link WhatsApp Using Pairing Code

1. Open WhatsApp on your phone
2. Tap Menu (⋮) > "Linked Devices"
3. Tap "Link a Device"
4. **Enter the pairing code** shown in console (NOT scan QR)
5. Wait for "✅ Connected successfully!"

✅ **Done!** Your bot is now connected and running!

## Testing the Bot

Send these commands in WhatsApp:

```
.menu          - View all commands
.ping          - Test bot response
.reg           - Register yourself
.balance       - Check your balance
.sticker       - Reply to image to create sticker
.help          - Get help
```

## Customization

### Change Owner Number

Edit `config.js`:

```javascript
OWNER_NUMBER: 'YOUR_NUMBER@s.whatsapp.net',
```

Replace with your WhatsApp number (e.g., '2349049460676@s.whatsapp.net')

### Change Bot Name

```javascript
BOT_NAME: 'Your Bot Name',
```

### Change Command Prefix

```javascript
PREFIX: '.',  // Change to !, /, etc.
```

### Change Sticker Pack Info

```javascript
DEFAULT_STICKER_PACK: 'Your Pack Name',
DEFAULT_STICKER_AUTHOR: 'Your Name',
```

## Troubleshooting

### Bot doesn't respond
- Check if bot is running in Replit
- Check if QR code was scanned correctly
- Check console for errors

### Firebase errors
- Verify all three secrets are set correctly
- Check Firebase Console if Firestore is enabled
- Ensure private key includes `\n` characters

### Command not working
- Check if you're using correct prefix (default: .)
- Check if you're registered (.reg)
- Check console for error messages

### QR code not appearing
- Clear cache and restart Replit
- Check if Baileys is installed correctly
- Run `npm install` manually if needed

## Manual Installation (Local/VPS)

### Prerequisites
- Node.js 16 or higher
- FFmpeg (for video stickers)
- Git

### Steps

1. **Clone/Download the bot**
```bash
cd nexora-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
nano .env  # Edit with your credentials
```

4. **Run the bot**
```bash
npm start
```

## Keeping Bot Online (Replit)

Replit may put your bot to sleep after inactivity. To keep it running:

1. Use [UptimeRobot](https://uptimerobot.com) to ping your Replit URL
2. Or use Replit's "Always On" feature (paid)

## Support

For issues:
1. Check console logs for errors
2. Verify Firebase configuration
3. Ensure all dependencies are installed
4. Contact bot owner

## Security Notes

- Never share your Firebase credentials
- Keep your `.env` file secure
- Don't commit credentials to GitHub
- Use Replit Secrets for sensitive data

---

**Nexora Bot** - Created with ❤️ by KYNX
