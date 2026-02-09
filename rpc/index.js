const RPC = require('discord-rpc');

const CLIENT_ID = '1445071315575898163';

const rpc = new RPC.Client({ transport: 'ipc' });

const startTimestamp = new Date();

async function setActivity() {
  if (!rpc) return;

  try {
    await rpc.setActivity({
      details: 'AWAS GEROBAK BELANDA',

      startTimestamp,

      largeImageKey: 'max_carpenter',
      smallImageKey: 'verif',
      smallImageText: 'Verif',

      instance: false,

      buttons: [
        {
          label: 'Github',
          url: 'https://connectt-notifications.neocities.org/'
        },
        {
          label: 'Vellpedia Club',
          url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0'
        }
      ]
    });
  } catch (err) {
    console.error('Failed to set activity:', err);
  }
}

rpc.on('ready', () => {
  console.log('🚀 Discord RPC Connected!');
  console.log(`Logged in as ${rpc.user.username}#${rpc.user.discriminator}`);
  console.log('✅ Rich Presence aktif');

  setActivity();

  setInterval(() => {
    setActivity();
  }, 15000);
});

rpc.login({ clientId: CLIENT_ID }).catch((error) => {
  console.error('❌ Error connecting to Discord:');
  console.error(error.message);
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
