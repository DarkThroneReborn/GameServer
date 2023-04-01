#!/bin/bash
echo "Is Production: $1"
echo "hash: $2"

ENV="beta"
if [ "$1" = "true" ]; then
  ENV="prod"
fi

FILE=$2.tar.gz
if test -f "$FILE"; then
  echo "$FILE exists."
fi

# Save private key to a temporary file
echo "$SSH_PRIVATE_KEY" > id_rsa
chmod 400 id_rsa

ssh -tt -i id_rsa $SSH_USERNAME@$SSH_HOST << EOF
  source ~/.bashrc
  mkdir -p Code/DarkThrone/$ENV/GameServer/builds
  mv builds/$FILE Code/DarkThrone/$ENV/GameServer/builds
  cd Code/DarkThrone/$ENV/GameServer/builds
  tar -xzf $FILE
  mv dist $2
  rm $FILE
  cd $2
  npm install --omit=dev
  cd ../../
  rm current
  ln -s builds/$2 current
  pm2 startOrRestart current/ecosystem.json --cwd current --env $ENV --only GameServer_$ENV
  exit
EOF

# Remove the temporary private key file
rm -f id_rsa
