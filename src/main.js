// --- Imports ---
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Bag } from './class/Bag'

// --- 1) Monte l'app Vue ---
createApp(App).mount('#app')

// --- 2) Lance le jeu une fois que le DOM est prêt ---
window.addEventListener('DOMContentLoaded', initGame)

function initGame() {
  // a) Récupération du canvas
  const canvas = document.getElementById('game')
  if (!canvas) {
    console.warn('Canvas #game non trouvé (as-tu bien <canvas id="game"> dans index.html ?)') 
    return
  }

  // b) Contexte 2D (alpha true = fond transparent possible)
  const ctx = canvas.getContext('2d', { alpha: true })

  // c) Mise à l’échelle HiDPI + suivi du redimensionnement
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect() // taille CSS réelle (ex: 100dvw/100dvh)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // “unités dessin” = pixels CSS
  }
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  // d) Crée les objets du jeu
  const bag = new Bag(100, 100) // ton sac Freitag

  // e) Boucle de jeu (avec delta time)
  let last = performance.now()
  function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.033) // limite le dt
    last = now

    // update(dt) si tu gères un déplacement; ici on ne modifie que le rendu
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bag.draw(ctx)

    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}
