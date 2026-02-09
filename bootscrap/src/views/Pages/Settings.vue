<template>
  <admin-layout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Kelola data akademik dan profil kamu
      </p>
    </div>

    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <!-- Manual Semester Update Card -->
      <div class="col-span-12 lg:col-span-6">
        <manual-semester-update />
      </div>

      <!-- Personal Info (Optional) -->
      <div class="col-span-12 lg:col-span-6">
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Data Diri</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Informasi pribadi kamu
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nama Lengkap
              </label>
              <input
                v-model="userData.namaLengkap"
                type="text"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                disabled
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                NIM
              </label>
              <input
                v-model="userData.nim"
                type="text"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                disabled
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Program Studi
              </label>
              <input
                v-model="userData.programStudi"
                type="text"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                disabled
              />
            </div>

            <div class="pt-2">
              <button
                class="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Edit Data Diri
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import ManualSemesterUpdate from '../../components/common/ManualSemesterUpdate.vue'

const userData = ref({
  namaLengkap: '',
  nim: '',
  programStudi: '',
  semesterAktif: '',
  ipkSaatIni: '',
  targetIpk: ''
})

onMounted(() => {
  const saved = localStorage.getItem('userData')
  if (saved) {
    userData.value = JSON.parse(saved)
  }
})
</script>
