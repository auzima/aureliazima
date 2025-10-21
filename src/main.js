import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Bag } from './class/Bag'
import { Stoicmind } from './class/Stoicmind'
import { InputController } from './utils/InputController' // garde SEULEMENT cet import

createApp(App).mount('#app')
window.addEventListener('DOMContentLoaded', initGame)

function initGame() {
  const canvas = document.getElementById('game')
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })

  let dpr = 1, cssW = 0, cssH = 0
  let bag, stoicmind

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    cssW = rect.width; cssH = rect.height
    canvas.width  = Math.floor(cssW * dpr)
    canvas.height = Math.floor(cssH * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (bag?.loaded) bag.setBottomCentered(cssW, cssH)
  }
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  const input = new InputController({ prevent: true })

  bag = new Bag(0, 0, 250)                 // doit avoir .update(...)
  bag.onLoaded(() => bag.setBottomCentered(cssW, cssH))

  stoicmind = new Stoicmind(200, -300, 180, 160)

  let last = performance.now()
  function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.033); last = now

    const dir = input.getDirection()
    // console.log(dir) // décommente pour vérifier les touches
    bag.update(dir, dt, cssW, cssH)
    stoicmind.update(dt, cssW, cssH)

    ctx.clearRect(0, 0, cssW, cssH)
    stoicmind.draw(ctx)
    bag.draw(ctx)

    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}
