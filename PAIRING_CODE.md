# 📱 PAIRING CODE SETUP GUIDE

## ✅ YES! This bot uses PAIRING CODE (Not QR Code)

### Why Pairing Code?
- ✅ **Easier for Replit** - No need to scan QR on console
- ✅ **More reliable** - Works better on servers
- ✅ **Cleaner** - Just enter a simple code
- ✅ **Official method** - Supported by Baileys

---

## 🚀 How to Connect

### Step 1: Run the Bot
```bash
npm start
```

### Step 2: Enter Phone Number
When prompted:
```
Enter your phone number (with country code, e.g., 2349049460676):
```

Enter your WhatsApp number **without** the `+` symbol:
- ✅ Correct: `2349049460676`
- ❌ Wrong: `+234 904 946 0676`
- ❌ Wrong: `9049460676` (missing country code)

### Step 3: Get Pairing Code
You'll see:
```
🔐 Your Pairing Code: ABCD-1234

Enter this code in WhatsApp:
1. Open WhatsApp on your phone
2. Tap Menu (⋮) > Linked Devices
3. Tap "Link a Device"
4. Enter the code: ABCD-1234
```

### Step 4: Link in WhatsApp

#### On Your Phone:
1. Open **WhatsApp**
2. Tap the **three dots (⋮)** menu
3. Select **"Linked Devices"**
4. Tap **"Link a Device"**
5. You'll see two options:
   - **Scan QR Code** ← Don't use this
   - **Link with Phone Number** ← Use this!
6. Tap **"Link with Phone Number"**
7. **Enter the pairing code** (e.g., ABCD-1234)
8. Tap **"Link"**

### Step 5: Wait for Connection
```
✅ Connected successfully!
Bot Name: Violet (Nexora)
Prefix: .
```

---

## 🔄 Reconnection

Once connected, the bot **saves auth** in `/auth` folder.

**Next time you run:**
- ❌ No phone number needed
- ❌ No pairing code needed
- ✅ Auto-connects using saved session

**Only enter pairing code on FIRST connection!**

---

## ⚠️ Troubleshooting

### "Invalid phone number"
- Make sure to include country code
- Don't use `+` or spaces
- Example: `2349049460676` (Nigeria)

### "Pairing code expired"
- Codes expire after 5 minutes
- Just restart the bot
- Get a new code

### "Already linked"
- You can only link to one bot at a time
- Unlink previous session first
- Or delete `/auth` folder and start fresh

### "Connection closed"
- Check internet connection
- Wait 10 seconds and restart
- Delete `/auth` and reconnect

---

## 🔧 Advanced Options

### Want QR Code Instead?
Edit `index.js`:

```javascript
// Change this:
printQRInTerminal: false,

// To this:
printQRInTerminal: true,

// And remove the pairing code section
```

### Custom Pairing Message
Edit the pairing code section in `index.js` to customize the display.

---

## 📝 Example Session

```
$ npm start

> nexora-bot@1.0.0 start
> node index.js

✅ Firebase initialized successfully
✅ Loaded 138 commands
Enter your phone number (with country code, e.g., 2349049460676): 2349049460676

🔐 Your Pairing Code: ABCD-1234

Enter this code in WhatsApp:
1. Open WhatsApp on your phone
2. Tap Menu (⋮) > Linked Devices
3. Tap "Link a Device"
4. Enter the code: ABCD-1234

✅ Connected successfully!
Bot Name: Violet (Nexora)
Prefix: .
```

---

## ✅ Benefits of Pairing Code

| Feature | Pairing Code | QR Code |
|---------|-------------|---------|
| Works on Replit | ✅ Yes | ⚠️ Sometimes |
| Easy to use | ✅ Very easy | ❌ Need to scan |
| Reliable | ✅ More stable | ⚠️ Can fail |
| Official | ✅ Baileys native | ✅ Yes |
| Secure | ✅ Same security | ✅ Same security |

---

**Your bot uses PAIRING CODE by default!** 🎉
