# Sistem Onboarding & Update Semester

Sudah dibuat 3 sistem lengkap untuk mengelola data IPK user:

## 📁 File yang Dibuat

### 1. Onboarding Wizard (User Baru)
**File**: `src/components/common/OnboardingWizard.vue`

**Fungsi**: Multi-step wizard untuk user baru setelah signup
- **Step 1**: Data Diri (Nama, NIM, Prodi)
- **Step 2**: Data Akademik (Semester, IPK saat ini, Target IPK, Total SKS)
- **Step 3**: Konfirmasi & Welcome

**Cara Pakai**:
```vue
<!-- Di App.vue atau halaman setelah signup -->
<template>
  <OnboardingWizard v-if="!isOnboardingCompleted" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OnboardingWizard from './components/common/OnboardingWizard.vue'

const isOnboardingCompleted = ref(true)

onMounted(() => {
  const completed = localStorage.getItem('onboardingCompleted')
  isOnboardingCompleted.value = !!completed
})
</script>
```

### 2. Semester Update Banner (Notifikasi Otomatis)
**File**: `src/components/common/SemesterUpdateBanner.vue`

**Fungsi**: Banner otomatis muncul saat semester baru dimulai
- Auto-detect semester baru
- Bisa di-dismiss (tersimpan per session)
- Muncul lagi saat login berikutnya jika belum update

**Sudah diintegrasikan di**: `src/views/Ecommerce.vue`

### 3. Semester Update Modal
**File**: `src/components/common/SemesterUpdateModal.vue`

**Fungsi**: Modal untuk input IPK semester baru
- IPK semester lalu (readonly)
- Semester aktif baru (auto increment)
- Input IPK semester baru
- Otomatis simpan history semester

**Sudah diintegrasikan di**: `src/views/Ecommerce.vue`

### 4. Manual Semester Update Card
**File**: `src/components/common/ManualSemesterUpdate.vue`

**Fungsi**: Card di halaman Settings untuk update manual
- Tampilkan semester & IPK saat ini
- Button "Update Semester Baru"
- Riwayat semester (history)

**Sudah diintegrasikan di**: `src/views/Pages/Settings.vue`

## 🔄 Flow Lengkap

### A. User Baru (First Time)
```
Sign Up → OnboardingWizard (3 steps) → Dashboard
```

Data tersimpan di `localStorage.userData`:
```json
{
  "namaLengkap": "John Doe",
  "nim": "12345678",
  "programStudi": "Teknik Informatika",
  "semesterAktif": "3",
  "ipkSaatIni": "3.45",
  "targetIpk": "3.80",
  "totalSks": "144"
}
```

### B. Semester Baru (Auto)
```
Login → System cek semester → Banner muncul → User klik "Update" → Modal → Simpan → Dashboard terupdate
```

Data tersimpan:
- `localStorage.lastUpdatedSemester`: Semester terakhir update
- `localStorage.semesterHistory`: Array history semester

### C. Manual Update (Kapan Saja)
```
Menu Settings → Manual Semester Update Card → Klik "Update Semester Baru" → Modal → Simpan
```

## 📊 Data Storage

### localStorage Keys:
1. **userData**: Data user lengkap
2. **onboardingCompleted**: Flag sudah onboarding
3. **lastUpdatedSemester**: Semester terakhir update
4. **semesterHistory**: History IPK per semester
   ```json
   [
     { "semester": 1, "ipk": "3.20", "date": "2025-08-01" },
     { "semester": 2, "ipk": "3.45", "date": "2026-02-01" }
   ]
   ```

### sessionStorage Keys:
- **semesterBannerDismissed**: Banner di-dismiss (reset setiap login)

## 🎯 Cara Menggunakan

### 1. Tambahkan route Settings
Di `src/router/index.ts`:
```javascript
{
  path: '/settings',
  name: 'Settings',
  component: () => import('../views/Pages/Settings.vue')
}
```

### 2. Tambahkan link di sidebar/menu
```vue
<router-link to="/settings">
  <SettingsIcon />
  Pengaturan
</router-link>
```

### 3. Integrasi OnboardingWizard di App.vue
```vue
<template>
  <OnboardingWizard v-if="showOnboarding" />
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OnboardingWizard from './components/common/OnboardingWizard.vue'

const showOnboarding = ref(false)

onMounted(() => {
  const completed = localStorage.getItem('onboardingCompleted')
  showOnboarding.value = !completed
})
</script>
```

## ✨ Fitur Tambahan

- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support
- ✅ Auto-save data
- ✅ History tracking
- ✅ Validation input
- ✅ Loading states
- ✅ Error handling

## 🔧 Testing

1. **Test Onboarding**:
   - Hapus `localStorage.onboardingCompleted`
   - Refresh halaman
   - Wizard akan muncul

2. **Test Semester Banner**:
   - Hapus `localStorage.lastUpdatedSemester`
   - Refresh halaman Ecommerce
   - Banner akan muncul

3. **Test Manual Update**:
   - Buka `/settings`
   - Klik "Update Semester Baru"

## 🚀 Next Steps

1. Integrasi dengan backend API (ganti localStorage dengan API calls)
2. Tambahkan validasi lebih ketat
3. Email notification untuk semester baru
4. Export data semester ke PDF/Excel
5. Target IPK calculator
