import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

// Authentication
export const authService = {
  async signup(userData: any) {
    const response = await api.post('/auth/signup', userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.user))
    }
    return response.data
  },

  async signin(email: string, password: string) {
    const response = await api.post('/auth/signin', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('onboardingCompleted')
    window.location.href = '/signin'
  }
}

// User
export const userService = {
  async getProfile() {
    const response = await api.get('/user/profile')
    return response.data
  },

  async updateProfile(data: any) {
    const response = await api.put('/user/profile', data)
    // Update localStorage
    localStorage.setItem('userData', JSON.stringify(response.data.user))
    return response.data
  },

  async updateAcademic(data: any) {
    const response = await api.put('/user/academic', data)
    // Update localStorage
    localStorage.setItem('userData', JSON.stringify(response.data.user))
    return response.data
  }
}

// Semester
export const semesterService = {
  async getHistory() {
    const response = await api.get('/semester/history')
    return response.data
  },

  async updateSemester(semester: number, ipkLokal: number, ipkUtama: number) {
    const response = await api.post('/semester/update', {
      semester,
      ipkLokal,
      ipkUtama
    })
    // Update localStorage
    localStorage.setItem('userData', JSON.stringify(response.data.user))
    return response.data
  }
}

export default api
