import { createApp, onMounted } from 'vue'
import './style.css'
import App from './App.vue'

// 1️⃣ Monte ton app Vue
const app = createApp(App)
app.mount('#app')

// 2️⃣ Attends que le DOM soit prêt avant d'accéder au canvas
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game')
  if (!canvas) {
    console.warn('Canvas #game non trouvé')
    return
  }

  const ctx = canvas.getContext('2d', { alpha: true })

  // Exemple de setup minimal
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

})
