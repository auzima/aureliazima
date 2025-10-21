// --- Imports ---
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Bag } from './class/Bag'    // <-- garder CET import et supprimer toute classe Bag ici

// --- 1) Monte l'app Vue ---
createApp(App).mount('#app')

// --- 2) Lance le jeu une fois que le DOM est prêt ---
window.addEventListener('DOMContentLoaded', initGame)

function initGame() {
  const canvas = document.getElementById('game')
  if (!canvas) {
    console.warn('Canvas #game non trouvé (as-tu bien <canvas id="game"> dans index.html ?)')
    return
  }

  const ctx = canvas.getContext('2d', { alpha: true })

  // tailles en pixels CSS (pas device)
  let dpr = 1, cssW = 0, cssH = 0
  let bag

  // Mise à l’échelle HiDPI + resize
  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    cssW = rect.width
    cssH = rect.height
    canvas.width  = Math.floor(cssW * dpr)
    canvas.height = Math.floor(cssH * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (bag && bag.loaded) {
      // rester centré en bas si on redimensionne
      bag.setBottomCentered(cssW, cssH)
    }
  }
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  // --- Contrôles clavier ---
  const keys = new Set()
  function onKey(e, down) {
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault() // évite le scroll
    }
    if (down) keys.add(e.key); else keys.delete(e.key)
  }
  window.addEventListener('keydown', e => onKey(e, true))
  window.addEventListener('keyup',   e => onKey(e, false))

  function inputDirection() {
    const up    = keys.has('ArrowUp')    || keys.has('w') || keys.has('W')
    const down  = keys.has('ArrowDown')  || keys.has('s') || keys.has('S')
    const left  = keys.has('ArrowLeft')  || keys.has('a') || keys.has('A')
    const right = keys.has('ArrowRight') || keys.has('d') || keys.has('D')
    let x = 0, y = 0
    if (left)  x -= 1
    if (right) x += 1
    if (up)    y -= 1
    if (down)  y += 1
    if (x !== 0 || y !== 0) {
      const len = Math.hypot(x, y)
      x /= len; y /= len
    }
    return { x, y }
  }
  

  // --- Objet du jeu ---
  bag = new Bag(0, 0, 250)           // position provisoire
  bag.onLoaded(() => bag.setBottomCentered(cssW, cssH))  // centre en bas quand image OK

  // --- Boucle de jeu ---
  let last = performance.now()
  function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.033) // ~30ms max
    last = now

    const dir = inputDirection()
    bag.update(dir, dt, cssW, cssH)

    // clear en unités CSS (ctx est déjà transformé)
    ctx.clearRect(0, 0, cssW, cssH)
    bag.draw(ctx)

    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}
