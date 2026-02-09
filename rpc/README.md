# Discord Rich Presence dengan Button

Discord RPC yang berfungsi dengan button interaktif!

## 📋 Fitur

- ✅ Discord Rich Presence aktif
- ✅ 2 Button yang bisa diklik
- ✅ Elapsed time counter
- ✅ Custom images (logo & status)
- ✅ Auto-update setiap 15 detik
- ✅ Mudah dikonfigurasi

## 🚀 Cara Setup

### 1. Buat Discord Application

1. Buka [Discord Developer Portal](https://discord.com/developers/applications)
2. Klik **"New Application"**
3. Beri nama aplikasi (contoh: "My Cool RPC")
4. Copy **Application ID** (ini adalah CLIENT_ID)

### 2. Upload Images (Optional)

1. Di Discord Application, buka tab **"Rich Presence" → "Art Assets"**
2. Upload image untuk:
   - **logo** (Large Image) - 1024x1024px
   - **status** (Small Image) - 256x256px (optional)
3. Nama file harus sama dengan `largeImageKey` dan `smallImageKey` di code

### 3. Install Dependencies

```bash
npm install
```

### 4. Konfigurasi

Edit file `index.js` dan ganti `CLIENT_ID`:

```javascript
const CLIENT_ID = 'PASTE_CLIENT_ID_ANDA_DISINI';
```

**ATAU** gunakan config file:

```bash
# Copy config example
cp config.example.js config.js

# Edit config.js dan isi CLIENT_ID
```

Lalu jalankan:
```bash
node index-with-config.js
```

### 5. Jalankan!

```bash
npm start
```

## 📝 Customisasi

Edit bagian `setActivity()` di `index.js`:

```javascript
rpc.setActivity({
  details: 'Baris pertama',          // Teks utama
  state: 'Baris kedua',               // Teks detail
  startTimestamp,                      // Waktu mulai (elapsed time)
  largeImageKey: 'logo',              // Nama image besar
  largeImageText: 'Hover text logo',  // Text saat hover
  smallImageKey: 'status',            // Nama image kecil
  smallImageText: 'Hover text status',// Text saat hover
  
  buttons: [
    {
      label: 'Visit Website',         // Text button 1
      url: 'https://example.com'      // URL button 1
    },
    {
      label: 'Join Discord',          // Text button 2
      url: 'https://discord.gg/xxx'   // URL button 2
    }
  ]
});
```

## 🎨 Contoh Tampilan

Ketika RPC aktif, akan muncul di profil Discord Anda:

```
┌─────────────────────────────────┐
│  [LOGO]  Sedang Ngoding         │
│          Membuat Project Keren  │
│          ⏱️ 00:15:32 elapsed    │
│                                 │
│  [Visit Website] [Join Discord] │
└─────────────────────────────────┘
```

## ⚠️ Troubleshooting

### RPC tidak muncul?

1. **Discord Desktop harus berjalan** (bukan browser!)
2. Aktifkan Rich Presence:
   - Settings → Activity Privacy
   - Enable "Display current activity as a status message"
3. CLIENT_ID harus benar
4. Restart Discord jika perlu

### Button tidak muncul?

- Button hanya muncul jika dilihat oleh user lain
- Untuk melihat sendiri, buka Discord di browser/akun lain

### Error "Could not connect"?

- Pastikan Discord Desktop sudah berjalan
- Coba restart aplikasi Discord
- Pastikan tidak ada aplikasi lain yang menggunakan Discord RPC

## 📦 Scripts

```bash
npm start        # Jalankan RPC
npm run dev      # Jalankan dengan auto-reload (nodemon)
```

## 🛠️ Tech Stack

- Node.js
- discord-rpc library
- Discord Developer Portal

## 📖 Resources

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord RPC Documentation](https://discord.com/developers/docs/topics/rpc)
- [discord-rpc npm package](https://www.npmjs.com/package/discord-rpc)

## 💡 Tips

1. **Image Size**: 
   - Large Image: 1024x1024px (recommended)
   - Small Image: 256x256px (recommended)

2. **Button Limits**: Maksimal 2 button

3. **Update Rate**: Jangan terlalu sering update (minimal 15 detik)

4. **URL Validation**: Button URL harus valid (https://)

## 📄 License

MIT

---

Made with ❤️ for Discord RPC
