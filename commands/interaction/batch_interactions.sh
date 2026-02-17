#!/bin/bash

# Create all interaction commands at once
interactions=(
  "kiss:💋:Kiss"
  "slap:👋:Slap"
  "wave:👋:Wave"
  "pat:🫳:Pat"
  "dance:💃:Dance"
  "sad:😢:Console"
  "smile:😊:Smile at"
  "laugh:😂:Laugh with"
  "lick:👅:Lick"
  "punch:👊:Punch"
  "bonk:🔨:Bonk"
  "tickle:🤗:Tickle"
  "kidnap:🚐:Kidnap"
)

for interaction in "${interactions[@]}"; do
  IFS=':' read -r name emoji action <<< "$interaction"
  cat > "${name}.js" << EOF
const createInteractionCommand = require('./interactionTemplate');
module.exports = createInteractionCommand('${name}', '${emoji}', '${action}');
EOF
done

echo "Created interaction commands!"
