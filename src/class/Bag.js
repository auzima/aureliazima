export class Bag {
  constructor(x, y, width = 250, speed = 260) {
    this.x = x
    this.y = y
    this.w = width
    this.h = width
    this.speed = speed         // px/s en coordonnées CSS
    this.loaded = false
    this.img = new Image()
    this._onLoaded = null

    this.img.src = '/sac-freitag-noir-sans-background.png' // image dans /public
    this.img.onload = () => {
      this.loaded = true
      const ratio = this.img.height / this.img.width
      this.h = this.w * ratio
      if (this._onLoaded) this._onLoaded()
    }
  }

  onLoaded(cb) { this._onLoaded = cb }

  // place centré horizontalement et posé en bas (coords CSS)
  setBottomCentered(cssW, cssH) {
    if (!this.loaded) return
    this.x = (cssW - this.w) / 2
    this.y = cssH - this.h
  }

  // déplace selon dir normalisée {x,y} et borne dans l'écran
  update(dir, dt, cssW, cssH) {
    if (!this.loaded) return
    this.x += dir.x * this.speed * dt
    this.y += dir.y * this.speed * dt

    const maxX = cssW - this.w
    const maxY = cssH - this.h
    if (this.x < 0) this.x = 0
    if (this.y < 0) this.y = 0
    if (this.x > maxX) this.x = maxX
    if (this.y > maxY) this.y = maxY
  }

  draw(ctx) {
    if (this.loaded) ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}
