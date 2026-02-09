<template>
  <admin-layout>
    <!-- Semester Update Banner -->
    <semester-update-banner @openUpdateModal="showUpdateModal = true" />

    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ipk-metrics />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <ipk-progress />
      </div>

      <div class="col-span-12">
        <statistics-chart />
      </div>
    </div>

    <!-- Semester Update Modal -->
    <semester-update-modal :is-open="showUpdateModal" @close="showUpdateModal = false" />
  </admin-layout>
</template>

<script>
import { ref } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import IpkMetrics from '../components/ecommerce/IpkMetrics.vue'
import IpkProgress from '../components/ecommerce/IpkProgress.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import SemesterUpdateBanner from '../components/common/SemesterUpdateBanner.vue'
import SemesterUpdateModal from '../components/common/SemesterUpdateModal.vue'

export default {
  components: {
    AdminLayout,
    IpkMetrics,
    IpkProgress,
    StatisticsChart,
    SemesterUpdateBanner,
    SemesterUpdateModal,
  },
  name: 'Ecommerce',
  setup() {
    const showUpdateModal = ref(false)
    
    return {
      showUpdateModal
    }
  }
}
</script>
