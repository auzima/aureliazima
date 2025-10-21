export class Stoicmind {
    constructor(x, y, width = 250, speed = 260) {
      this.x = x
      this.y = y
      this.w = width
      this.h = width
      this.speed = speed // px/s
      this.loaded = false
      this.img = new Image() // ✅ nom corrigé : c’était “project” par erreur
      this._onLoaded = null
  
      this.img.src = '/fantome.png' // ✅ image dans /public
      this.img.onload = () => {
        this.loaded = true
        const ratio = this.img.height / this.img.width
        this.h = this.w * ratio
        if (this._onLoaded) this._onLoaded()
      }
    }
  
    onLoaded(cb) {
      this._onLoaded = cb
    }
  
    // Fait descendre l'objet et le réinitialise quand il sort de l'écran
    update(dt, cssW, cssH) {
      if (!this.loaded) return
  
      // mouvement vertical vers le bas
      this.y += this.speed * dt
  
      // s'il sort du bas de l'écran → recommence en haut à une position aléatoire
      if (this.y > cssH) {
        this.y = -this.h // recommence juste au-dessus du canvas
        this.x = Math.random() * (cssW - this.w) // nouvelle position horizontale aléatoire
      }
    }
  
    draw(ctx) {
      if (this.loaded) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
      }
    }
  }
  
  