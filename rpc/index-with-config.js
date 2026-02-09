const RPC = require('discord-rpc');
const fs = require('fs');

let config;
if (fs.existsSync('./config.js')) {
  config = require('./config.js');
} else {
  console.log('⚠️  config.js tidak ditemukan, menggunakan config default');
  config = require('./config.example.js');
}

const rpc = new RPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc) return;

  const activityConfig = {
    ...config.rpc,
    startTimestamp,
    instance: false
  };

  rpc.setActivity(activityConfig);
  console.log('✅ Discord RPC updated!');
}

rpc.on('ready', () => {
  console.log('🚀 Discord RPC Connected!');
  console.log(`Logged in as ${rpc.user.username}#${rpc.user.discriminator}`);
  console.log(`\n📊 Current Activity:`);
  console.log(`   Details: ${config.rpc.details}`);
  console.log(`   State: ${config.rpc.state}`);
  console.log(`   Buttons: ${config.rpc.buttons.length}`);
  
  setActivity();

  setInterval(() => {
    setActivity();
  }, config.updateInterval);
});

rpc.login({ clientId: config.clientId }).catch((error) => {
  console.error('❌ Error connecting to Discord:');
  console.error(error.message);
  console.log('\n📝 Pastikan:');
  console.log('1. Discord Desktop app sedang berjalan');
  console.log('2. CLIENT_ID sudah diisi dengan benar di config.js');
  console.log('3. Rich Presence diaktifkan di Discord Settings');
});

rpc.on('error', (error) => {
  console.error('RPC Error:', error);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Discord RPC...');
  rpc.clearActivity();
  rpc.destroy();
  process.exit(0);
});
