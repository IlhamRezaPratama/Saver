<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Tambah Tugas Baru</h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <!-- Nama Tugas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nama Tugas <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            required
            placeholder="Contoh: VCLASS, Laporan Praktikum"
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Mata Kuliah -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mata Kuliah <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.course"
            type="text"
            required
            placeholder="Contoh: PSD, STRUKTUR DATA"
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Grid 2 columns for Priority & Status -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Prioritas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prioritas <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.priority"
              required
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Pilih Prioritas</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </div>

          <!-- Status Tugas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Tugas <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.status"
              required
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Pilih Status</option>
              <option value="Belum Mulai">Belum Mulai</option>
              <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>

        <!-- Grid 2 columns for Deadline & Submission Date -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Deadline -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deadline <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.deadline"
              type="date"
              required
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <!-- Dikumpulkan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dikumpulkan
            </label>
            <input
              v-model="formData.submitted"
              type="date"
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <!-- Status Pengumpulan -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status Pengumpulan
          </label>
          <select
            v-model="formData.submissionStatus"
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Belum Ada</option>
            <option value="Tepat Waktu">Tepat Waktu</option>
            <option value="Terlambat">Terlambat</option>
          </select>
        </div>

        <!-- Dokumen Tugas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Link Dokumen Tugas
          </label>
          <input
            v-model="formData.document"
            type="text"
            placeholder="https://drive.google.com/... atau URL lain"
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Optional - Link Google Drive, OneDrive, dll.</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Simpan Tugas
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Task {
  name: string
  course: string
  priority: string
  status: string
  deadline: string
  submitted: string
  submissionStatus: string
  document: string
}

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', task: Task): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref<Task>({
  name: '',
  course: '',
  priority: '',
  status: '',
  deadline: '',
  submitted: '',
  submissionStatus: '',
  document: ''
})

// Reset form ketika modal dibuka
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    formData.value = {
      name: '',
      course: '',
      priority: '',
      status: '',
      deadline: '',
      submitted: '',
      submissionStatus: '',
      document: ''
    }
  }
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('save', formData.value)
  closeModal()
}
</script>
