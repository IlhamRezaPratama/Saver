<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
      <onboarding-wizard v-if="showOnboarding" @close="showOnboarding = false" />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import OnboardingWizard from './components/common/OnboardingWizard.vue'

const showOnboarding = ref(false)

onMounted(() => {
  // Check if user has completed onboarding
  const onboardingCompleted = localStorage.getItem('onboardingCompleted')
  const userData = localStorage.getItem('userData')
  
  // Show onboarding if not completed and no user data exists
  if (!onboardingCompleted && !userData) {
    showOnboarding.value = true
  }
})
</script>
