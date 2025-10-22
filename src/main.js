import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Bag } from './class/Bag'
import { Stoicmind } from './class/Stoicmind'
import { InputController } from './utils/InputController'
import { uiStore as ui } from './stores/uiStore'

// Monte l'application Vue
createApp(App).mount('#app')

// Initialise le jeu après le chargement du DOM
window.addEventListener('DOMContentLoaded', initGame)

function initGame() {
  const canvas = document.getElementById('game')
  if (!canvas) return

  const ctx = canvas.getContext('2d', { alpha: true })

  let dpr = 1
  let cssW = 0
  let cssH = 0
  let paused = false
  let debugMode = true // Active la visualisation des collisions
  let bag
  let stoicmind

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    cssW = rect.width
    cssH = rect.height
    canvas.width = Math.floor(cssW * dpr)
    canvas.height = Math.floor(cssH * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    
    if (bag?.loaded) {
      bag.setBottomCentered(cssW, cssH)
    }
  }

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  const input = new InputController({ prevent: true })

  bag = new Bag(0, 0, 250)
  bag.onLoaded(() => bag.setBottomCentered(cssW, cssH))

  stoicmind = new Stoicmind(200, -300, 180, 160, {
    title: 'Stoicmind',
    description: 'Design an app that teaches users the principles of stoicism through daily lessons and challenges. Create a simple, calming app that delivers daily stoic wisdom and helps users apply it to their lives'
  })

  // Détection de collision AABB
  const intersects = (a, b) => {
    const hitboxA = a.getHitbox()
    const hitboxB = b.getHitbox()
    
    return (
      hitboxA.x < hitboxB.x + hitboxB.w &&
      hitboxA.x + hitboxA.w > hitboxB.x &&
      hitboxA.y < hitboxB.y + hitboxB.h &&
      hitboxA.y + hitboxA.h > hitboxB.y
    )
  }

  // Gestion des événements du popup
  window.addEventListener('popup:continue', () => {
    if (stoicmind.loaded) {
      stoicmind.y = -stoicmind.h
      stoicmind.x = Math.random() * (cssW - stoicmind.w)
    }
    paused = false
  })

  window.addEventListener('popup:retry', () => {
    if (bag.loaded) {
      bag.setBottomCentered(cssW, cssH)
    }
    if (stoicmind.loaded) {
      stoicmind.y = -stoicmind.h
      stoicmind.x = Math.random() * (cssW - stoicmind.w)
    }
    paused = false
  })

  // Boucle principale
  let lastTime = performance.now()

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.033)
    lastTime = now

    if (!paused) {
      const dir = input.getDirection()
      bag.update(dir, dt, cssW, cssH)
      stoicmind.update(dt, cssW, cssH)

      if (bag.loaded && stoicmind.loaded && intersects(bag, stoicmind)) {
        console.log('Collision détectée !') // Debug
        ui.popup.title = stoicmind.title
        ui.popup.description = stoicmind.description
        ui.popup.image = stoicmind.img?.src || ''
        ui.popup.visible = true
        console.log('Popup state:', ui.popup) // Debug
        paused = true
      }
    }

    ctx.clearRect(0, 0, cssW, cssH)
    stoicmind.draw(ctx, debugMode)
    bag.draw(ctx, debugMode)

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}