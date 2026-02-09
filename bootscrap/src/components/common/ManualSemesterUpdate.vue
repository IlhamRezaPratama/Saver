<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Data Akademik</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Kelola data IPK dan semester kamu
      </p>
    </div>

    <div class="space-y-4">
      <!-- Current Semester Info -->
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
        <div class="mb-3">
          <p class="text-xs text-gray-500 dark:text-gray-400">Semester Aktif</p>
          <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {{ currentSemester }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">IPK Lokal</p>
            <p class="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">
              {{ currentIpkLokal }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Program Studi</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">IPK Utama</p>
            <p class="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
              {{ currentIpkUtama }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Universitas</p>
          </div>
        </div>
      </div>

      <!-- Update Semester Button -->
      <button
        @click="openUpdateModal"
        class="w-full rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-4 text-center font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
      >
        <div class="flex items-center justify-center gap-2">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Update Semester Baru</span>
        </div>
      </button>

      <!-- Semester History -->
      <div>
        <p class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Riwayat Semester
        </p>
        <div class="space-y-2">
          <div
            v-for="(item, index) in semesterHistory"
            :key="index"
            class="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <div class="mb-2 flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Semester {{ item.semester }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(item.date) }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="rounded bg-blue-50 p-2 dark:bg-blue-900/20">
                <p class="text-xs text-gray-600 dark:text-gray-400">IPK Lokal</p>
                <p class="text-base font-bold text-blue-600 dark:text-blue-400">{{ item.ipkLokal || item.ipk || '-' }}</p>
              </div>
              <div class="rounded bg-purple-50 p-2 dark:bg-purple-900/20">
                <p class="text-xs text-gray-600 dark:text-gray-400">IPK Utama</p>
                <p class="text-base font-bold text-purple-600 dark:text-purple-400">{{ item.ipkUtama || item.ipk || '-' }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="semesterHistory.length === 0"
            class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800/50"
          >
            <p class="text-sm text-gray-500 dark:text-gray-400">Belum ada riwayat semester</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <SemesterUpdateModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @updated="loadData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SemesterUpdateModal from './SemesterUpdateModal.vue'

const currentSemester = ref(3)
const currentIpkLokal = ref('3.50')
const currentIpkUtama = ref('3.45')
const semesterHistory = ref<Array<{ semester: number; ipkLokal?: string; ipkUtama?: string; ipk?: string; date: string }>>([])
const isModalOpen = ref(false)

const openUpdateModal = () => {
  isModalOpen.value = true
}

const loadData = () => {
  const userData = localStorage.getItem('userData')
  if (userData) {
    const data = JSON.parse(userData)
    currentSemester.value = parseInt(data.semesterAktif) || 3
    currentIpkLokal.value = data.ipkLokal || data.ipkSaatIni || '3.50'
    currentIpkUtama.value = data.ipkUtama || data.ipkSaatIni || '3.45'
  }

  const history = localStorage.getItem('semesterHistory')
  if (history) {
    semesterHistory.value = JSON.parse(history).reverse() // Show newest first
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
}

onMounted(() => {
  loadData()
})
</script>
