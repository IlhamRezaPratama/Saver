<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <!-- Navbar -->
    <nav class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">IPK Tracker</span>
          </div>

          <!-- Nav Links -->
          <div class="hidden items-center gap-8 md:flex">
            <a href="#features" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Fitur</a>
            <a href="#about" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Tentang</a>
            <router-link to="/signin" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Masuk</router-link>
            <router-link to="/signup" class="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Daftar Gratis</router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
        <div class="space-y-1 px-4 py-3">
          <a href="#features" class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">Fitur</a>
          <a href="#about" class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">Tentang</a>
          <router-link to="/signin" class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">Masuk</router-link>
          <router-link to="/signup" class="block rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">Daftar Gratis</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/30">
              <svg class="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-sm font-medium text-blue-600">Kelola IPK dengan Mudah</span>
            </div>

            <h1 class="text-5xl font-bold leading-tight text-gray-900 dark:text-white sm:text-6xl">
              Capai Target IPK Impianmu
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-400">
              Platform lengkap untuk tracking IPK, manajemen tugas, dan monitor progres akademikmu. Tetap terorganisir dan raih prestasi terbaik!
            </p>

            <div class="flex flex-col gap-4 sm:flex-row">
              <router-link to="/signup" class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700">
                <span>Mulai Sekarang</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
              <router-link to="/signin" class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                Sudah Punya Akun
              </router-link>
            </div>

            <div class="flex items-center gap-8 pt-4">
              <div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">100+</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Mahasiswa Aktif</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">4.5★</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Rating Pengguna</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">98%</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Kepuasan</p>
              </div>
            </div>
          </div>

          <!-- Right Content - Dashboard Preview -->
          <div class="relative">
            <div class="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard Preview</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Real-time IPK tracking</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p class="text-sm text-gray-500 dark:text-gray-400">IPK Saat Ini</p>
                  <p class="mt-1 text-3xl font-bold text-gray-900 dark:text-white">3.45</p>
                  <div class="mt-2 flex items-center gap-1 text-sm font-medium text-green-600">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>0.15</span>
                  </div>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Target IPK</p>
                  <p class="mt-1 text-3xl font-bold text-gray-900 dark:text-white">3.80</p>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Semester 7</p>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Tugas Aktif</p>
                  <p class="mt-1 text-3xl font-bold text-gray-900 dark:text-white">8</p>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Selesai</p>
                  <p class="mt-1 text-3xl font-bold text-gray-900 dark:text-white">5</p>
                </div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div class="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-gray-50 px-4 py-20 dark:bg-gray-900/50 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white">Fitur Unggulan</h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Semua yang kamu butuhkan dalam satu platform</p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Tracking IPK Real-time</h3>
            <p class="text-gray-600 dark:text-gray-400">Monitor perkembangan IPK setiap semester dengan visualisasi grafik yang jelas</p>
          </div>

          <!-- Feature 2 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Manajemen Tugas</h3>
            <p class="text-gray-600 dark:text-gray-400">Kelola semua tugas kuliah dengan sistem prioritas dan deadline reminder</p>
          </div>

          <!-- Feature 3 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Target & Progress</h3>
            <p class="text-gray-600 dark:text-gray-400">Set target IPK dan lihat progress kamu secara otomatis</p>
          </div>

          <!-- Feature 4 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Reminder Otomatis</h3>
            <p class="text-gray-600 dark:text-gray-400">Notifikasi untuk deadline tugas dan update semester baru</p>
          </div>

          <!-- Feature 5 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Statistik Lengkap</h3>
            <p class="text-gray-600 dark:text-gray-400">Analisis performa akademik dengan grafik dan chart detail</p>
          </div>

          <!-- Feature 6 -->
          <div class="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Mobile Friendly</h3>
            <p class="text-gray-600 dark:text-gray-400">Akses dari mana saja, kapan saja dengan tampilan responsif</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white">Siap Capai IPK Terbaikmu?</h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Bergabung dengan ratusan mahasiswa yang sudah sukses mengelola IPK mereka</p>
        <router-link to="/signup" class="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700">
          <span>Mulai Gratis Sekarang</span>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white px-4 py-8 dark:border-gray-800 dark:bg-gray-900">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-sm text-gray-600 dark:text-gray-400">© 2026 IPK Tracker. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</a>
            <a href="#" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</a>
            <a href="#" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
