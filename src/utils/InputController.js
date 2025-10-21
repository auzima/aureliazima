export class InputController {
    constructor({ prevent = true } = {}) {
      this.keys = new Set()
      this.prevent = prevent
  
      this._down = e => {
        if (this.prevent && this._isGameKey(e.key)) e.preventDefault()
        this.keys.add(e.key)
      }
      this._up = e => {
        if (this.prevent && this._isGameKey(e.key)) e.preventDefault()
        this.keys.delete(e.key)
      }
  
      window.addEventListener('keydown', this._down)
      window.addEventListener('keyup', this._up)
    }
  
    destroy() {
      window.removeEventListener('keydown', this._down)
      window.removeEventListener('keyup', this._up)
    }
  
    _isGameKey(k) {
      return ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D','Shift',' '].includes(k)
    }
  
    isDown(k) { return this.keys.has(k) }
  
    // Direction normalisée (flèches + WASD), avec sprint Shift
    getDirection() {
      const up    = this.isDown('ArrowUp')    || this.isDown('w') || this.isDown('W')
      const down  = this.isDown('ArrowDown')  || this.isDown('s') || this.isDown('S')
      const left  = this.isDown('ArrowLeft')  || this.isDown('a') || this.isDown('A')
      const right = this.isDown('ArrowRight') || this.isDown('d') || this.isDown('D')
  
      let x = 0, y = 0
      if (left)  x -= 1
      if (right) x += 1
      if (up)    y -= 1
      if (down)  y += 1
      if (x || y) { const l = Math.hypot(x, y); x /= l; y /= l }
  
      const sprint = this.isDown('Shift') ? 1.8 : 1
      return { x: x * sprint, y: y * sprint }
    }
  }
  