<template>
  <div
    v-if="shouldShowBanner"
    class="relative mb-6 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 dark:border-blue-800 dark:from-blue-900/30 dark:to-blue-800/30"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-blue-900 dark:text-blue-100">
            🎓 Semester Baru Telah Dimulai!
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Update data IPK semester {{ currentSemester }} untuk melacak progres akademikmu
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="openUpdateModal"
          class="whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Update Sekarang
        </button>
        <button
          @click="dismissBanner"
          class="rounded-lg p-2 text-blue-600 hover:bg-blue-200 dark:text-blue-400 dark:hover:bg-blue-800/50"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['openUpdateModal'])

const currentSemester = ref(3)
const isDismissed = ref(false)

const shouldShowBanner = computed(() => {
  if (isDismissed.value) return false
  
  const lastUpdatedSemester = localStorage.getItem('lastUpdatedSemester')
  const onboardingCompleted = localStorage.getItem('onboardingCompleted')
  
  // Don't show if onboarding not completed
  if (!onboardingCompleted) return false
  
  // Show if never updated or semester changed
  if (!lastUpdatedSemester) return true
  
  return parseInt(lastUpdatedSemester) < currentSemester.value
})

const openUpdateModal = () => {
  emit('openUpdateModal')
}

const dismissBanner = () => {
  isDismissed.value = true
  // Save dismiss state for current session only
  sessionStorage.setItem('semesterBannerDismissed', 'true')
}

onMounted(() => {
  // Check if already dismissed this session
  const sessionDismissed = sessionStorage.getItem('semesterBannerDismissed')
  if (sessionDismissed) {
    isDismissed.value = true
  }
  
  // Get current semester from saved data
  const userData = localStorage.getItem('userData')
  if (userData) {
    const data = JSON.parse(userData)
    currentSemester.value = parseInt(data.semesterAktif) || 3
  }
})
</script>
