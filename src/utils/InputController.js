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
      return ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D','Shift'].includes(k)
    }
  
    getDirection() {
      const up    = this.keys.has('ArrowUp')    || this.keys.has('w') || this.keys.has('W')
      const down  = this.keys.has('ArrowDown')  || this.keys.has('s') || this.keys.has('S')
      const left  = this.keys.has('ArrowLeft')  || this.keys.has('a') || this.keys.has('A')
      const right = this.keys.has('ArrowRight') || this.keys.has('d') || this.keys.has('D')
  
      let x = 0, y = 0
      if (left)  x -= 1
      if (right) x += 1
      if (up)    y -= 1
      if (down)  y += 1
      if (x || y) { const l = Math.hypot(x, y); x /= l; y /= l } // diagonale constante
  
      return { x, y }
    }
  }
  