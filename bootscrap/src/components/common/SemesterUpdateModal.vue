<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm"
    @click.self="close"
  >
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            Update Semester Baru
          </h3>
          <button
            @click="close"
            class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Semester Aktif (Auto Increment) -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Semester Aktif
            </label>
            <input
              :value="newSemester"
              type="text"
              readonly
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            />
          </div>

          <!-- IPK Lokal Semester Lalu (Readonly) -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              IPK Lokal Semester Lalu
            </label>
            <input
              :value="previousIpkLokal"
              type="text"
              readonly
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Program Studi</p>
          </div>

          <!-- IPK Utama Semester Lalu (Readonly) -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              IPK Utama Semester Lalu
            </label>
            <input
              :value="previousIpkUtama"
              type="text"
              readonly
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Universitas</p>
          </div>

          <hr class="border-gray-200 dark:border-gray-700" />

          <!-- IPK Lokal Semester Ini (Input) -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              IPK Lokal Semester {{ newSemester }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newIpkLokal"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="Contoh: 3.67"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Program Studi semester ini</p>
          </div>

          <!-- IPK Utama Semester Ini (Input) -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              IPK Utama Semester {{ newSemester }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newIpkUtama"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="Contoh: 3.65"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">IPK Universitas semester ini</p>
          </div>

          <!-- Info Box -->
          <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <p class="text-sm text-blue-800 dark:text-blue-300">
              💡 Data semester lama akan tersimpan dalam riwayat untuk tracking progres IPK kamu
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex gap-3">
          <button
            @click="close"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Batal
          </button>
          <button
            @click="saveUpdate"
            :disabled="!newIpkLokal || !newIpkUtama"
            class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'updated'])

const previousIpkLokal = ref('3.50')
const previousIpkUtama = ref('3.45')
const newSemester = ref(3)
const newIpkLokal = ref('')
const newIpkUtama = ref('')

const close = () => {
  emit('close')
}

const saveUpdate = () => {
  if (!newIpkLokal.value || !newIpkUtama.value) return

  // Get existing data
  const userData = localStorage.getItem('userData')
  if (userData) {
    const data = JSON.parse(userData)
    
    // Save to semester history
    const history = JSON.parse(localStorage.getItem('semesterHistory') || '[]')
    history.push({
      semester: data.semesterAktif,
      ipkLokal: data.ipkLokal || data.ipkSaatIni, // Fallback for old data
      ipkUtama: data.ipkUtama || data.ipkSaatIni,
      date: new Date().toISOString()
    })
    localStorage.setItem('semesterHistory', JSON.stringify(history))
    
    // Update current data
    data.ipkLokal = parseFloat(newIpkLokal.value)
    data.ipkUtama = parseFloat(newIpkUtama.value)
    data.semesterAktif = newSemester.value
    
    // Remove old ipkSaatIni if exists
    delete data.ipkSaatIni
    
    localStorage.setItem('userData', JSON.stringify(data))
    
    // Mark as updated
    localStorage.setItem('lastUpdatedSemester', newSemester.value.toString())
  }

  emit('updated')
  emit('close')
  
  // Reload to update dashboard
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

onMounted(() => {
  // Load previous data
  const userData = localStorage.getItem('userData')
  if (userData) {
    const data = JSON.parse(userData)
    previousIpkLokal.value = data.ipkLokal || data.ipkSaatIni || '3.50'
    previousIpkUtama.value = data.ipkUtama || data.ipkSaatIni || '3.45'
    newSemester.value = parseInt(data.semesterAktif) + 1 || 3
  }
})
</script>
