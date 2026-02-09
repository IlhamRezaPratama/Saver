<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
        <!-- Progress Steps -->
        <div class="mb-8 flex items-center justify-between">
          <div v-for="step in 3" :key="step" class="flex items-center">
            <div
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full font-semibold',
                currentStep >= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
              ]"
            >
              {{ step }}
            </div>
            <div
              v-if="step < 3"
              :class="[
                'mx-4 h-1 w-16',
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'
              ]"
            ></div>
          </div>
        </div>

        <!-- Step 1: Data Diri -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Lengkapi Data Diri</h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Isi data diri kamu untuk memulai
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Nama Lengkap</label
              >
              <input
                v-model="formData.namaLengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >NIM</label
              >
              <input
                v-model="formData.nim"
                type="text"
                placeholder="Masukkan NIM"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Program Studi</label
              >
              <input
                v-model="formData.programStudi"
                type="text"
                placeholder="Contoh: Teknik Informatika"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <!-- Foto Profil Upload -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Foto Profil (Opsional)</label
              >
              <div class="flex items-center gap-4">
                <!-- Preview -->
                <div
                  v-if="photoPreview"
                  class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-700"
                >
                  <img :src="photoPreview" alt="Preview" class="h-full w-full object-cover" />
                  <button
                    @click="removePhoto"
                    type="button"
                    class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Upload Button -->
                <div class="flex-1">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handlePhotoUpload"
                    class="hidden"
                  />
                  <button
                    @click="$refs.fileInput.click()"
                    type="button"
                    class="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-gray-700"
                  >
                    <span v-if="!photoPreview">📷 Pilih Foto</span>
                    <span v-else>🔄 Ganti Foto</span>
                  </button>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Maksimal 2MB, format JPG/PNG</p>
                  <p v-if="photoError" class="mt-1 text-xs text-red-600 dark:text-red-500">{{ photoError }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Data Akademik -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Data Akademik</h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Isi data IPK dan semester kamu saat ini
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Semester Aktif</label
              >
              <select
                v-model="formData.semesterAktif"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Pilih Semester</option>
                <option v-for="sem in 14" :key="sem" :value="sem">Semester {{ sem }}</option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >IPK Lokal</label
                >
                <input
                  v-model="formData.ipkLokal"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="Contoh: 3.50"
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Program Studi</p>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >IPK Utama</label
                >
                <input
                  v-model="formData.ipkUtama"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="Contoh: 3.45"
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Universitas</p>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Target IPK</label
              >
              <input
                v-model="formData.targetIpk"
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="Contoh: 3.80"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Total SKS Diambil</label
              >
              <input
                v-model="formData.totalSks"
                type="number"
                placeholder="Contoh: 144"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Selesai -->
        <div v-if="currentStep === 3" class="space-y-6 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              class="h-10 w-10 text-green-600 dark:text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Data kamu sudah tersimpan. Gw jadiin pinjol
            </p>
          </div>

        </div>

        <!-- Buttons -->
        <div class="mt-8 flex items-center justify-between gap-4">
          <button
            v-if="currentStep > 1 && currentStep < 3"
            @click="prevStep"
            class="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Kembali
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 3"
            @click="nextStep"
            class="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {{ currentStep === 2 ? 'Selesai' : 'Lanjut' }}
          </button>
          <button
            v-else
            @click="finish"
            class="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isOpen = ref(true)
const currentStep = ref(1)
const photoPreview = ref<string | null>(null)
const photoError = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

const formData = reactive({
  namaLengkap: '',
  nim: '',
  programStudi: '',
  semesterAktif: '',
  ipkLokal: '',
  ipkUtama: '',
  targetIpk: '',
  totalSks: '',
  profilePhoto: ''
})

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // Reset error
  photoError.value = ''
  
  // Validasi tipe file
  if (!file.type.startsWith('image/')) {
    photoError.value = 'File harus berupa gambar (JPG, PNG, dll)'
    return
  }
  
  // Validasi ukuran file (max 2MB = 2 * 1024 * 1024 bytes)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    photoError.value = `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 2MB`
    return
  }
  
  // Convert to base64 untuk preview dan storage
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    photoPreview.value = result
    formData.profilePhoto = result
  }
  reader.readAsDataURL(file)
}

const removePhoto = () => {
  photoPreview.value = null
  formData.profilePhoto = ''
  photoError.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
  
  // Save data when moving from step 2 to 3
  if (currentStep.value === 3) {
    saveData()
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const saveData = () => {
  // Save to localStorage or API
  localStorage.setItem('userData', JSON.stringify(formData))
  localStorage.setItem('onboardingCompleted', 'true')
  console.log('Data saved:', formData)
}

const finish = () => {
  isOpen.value = false
  // Redirect to dashboard atau reload
  window.location.href = '/'
}
</script>
