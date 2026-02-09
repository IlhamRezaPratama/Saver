<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">List Tugas</h3>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tugas</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Mata Kuliah</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prioritas</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status Tugas</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Deadline</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Dikumpulkan</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status Pengumpulan</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Dokumen Tugas</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(task, index) in tasks"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
          >
            <td class="px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ task.name }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'inline-block rounded px-2 py-1 text-theme-xs font-medium',
                  task.courseColor
                ]"
              >
                {{ task.course }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'inline-block rounded px-2 py-1 text-theme-xs font-medium',
                  getPriorityClass(task.priority)
                ]"
              >
                {{ task.priority }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'inline-block rounded-full px-2.5 py-0.5 text-theme-xs font-medium',
                  getStatusClass(task.status)
                ]"
              >
                {{ task.status }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p 
                :class="[
                  'text-theme-sm',
                  isOverdue(task.deadline) ? 'text-error-600 dark:text-error-500 font-medium' : 'text-gray-500 dark:text-gray-400'
                ]"
              >
                {{ formatDate(task.deadline) }}
                <span v-if="isOverdue(task.deadline)" class="ml-1">⏰</span>
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ task.submitted || '-' }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'inline-block rounded-full px-2.5 py-0.5 text-theme-xs font-medium',
                  task.submissionStatus === 'Belum' 
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
                    : 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                ]"
              >
                {{ task.submissionStatus }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <button 
                v-if="task.document"
                class="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 text-theme-sm font-medium"
              >
                📄 Lihat
              </button>
              <span v-else class="text-gray-400 text-theme-sm">-</span>
            </td>
          </tr>
          <!-- Empty row for adding new task -->
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="8" class="px-5 py-3 sm:px-6">
              <button 
                @click="openModal"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-theme-sm flex items-center gap-2 transition-colors"
              >
                <span class="text-lg">+</span> Halaman baru
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add Task Modal -->
    <AddTaskModal 
      :isOpen="isModalOpen" 
      @close="closeModal" 
      @save="saveTask" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddTaskModal from './AddTaskModal.vue'

const isModalOpen = ref(false)

const tasks = ref([
  {
    name: 'VCLASS',
    course: 'PSD',
    courseColor: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400',
    priority: 'Tinggi',
    status: 'Belum Mulai',
    deadline: '2025-11-13',
    submitted: null,
    submissionStatus: 'Belum',
    document: null
  },
  {
    name: 'VCLASS (KELOMPOK)',
    course: 'STRUKTUR DATA',
    courseColor: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-500',
    priority: 'Tinggi',
    status: 'On Progress',
    deadline: '2026-01-08',
    submitted: null,
    submissionStatus: 'Belum',
    document: null
  },
  {
    name: 'G-Drive',
    course: 'INFOKES',
    courseColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400',
    priority: 'Tinggi',
    status: 'Belum Mulai',
    deadline: '2026-01-31',
    submitted: null,
    submissionStatus: 'Belum',
    document: null
  }
])

// Load tasks dari localStorage saat component mounted
onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

// Auto-generate courseColor berdasarkan nama matkul
const getCourseColor = (course) => {
  const colors = [
    'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400',
    'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-500',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400',
    'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-500',
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
  ]
  
  // Generate index berdasarkan panjang string
  const index = course.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveTask = (newTask) => {
  // Add courseColor
  const taskWithColor = {
    ...newTask,
    courseColor: getCourseColor(newTask.course),
    submissionStatus: newTask.submissionStatus || 'Belum'
  }
  
  tasks.value.push(taskWithColor)
  
  // Save ke localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'Tinggi':
      return 'bg-error-100 text-error-700 dark:bg-error-500/15 dark:text-error-500'
    case 'Sedang':
      return 'bg-warning-100 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
    case 'Rendah':
      return 'bg-success-100 text-success-700 dark:bg-success-500/15 dark:text-success-500'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'On Progress':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-500'
    case 'Belum Mulai':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
    case 'Selesai':
      return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  })
}

const isOverdue = (deadline) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  return deadlineDate < today
}
</script>
