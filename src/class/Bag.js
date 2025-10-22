export class Bag {
    constructor(x, y, width = 250, speed = 260) {
      this.x = x
      this.y = y
      this.w = width
      this.h = width
      this.speed = speed
      this.loaded = false
      this.img = new Image()
      this._onLoaded = null
      this.hitboxScale = 0.2 // Réduit la hitbox à 70% de la taille
      this.hitboxOffsetY = 0.6 // Décale la hitbox vers le bas (30% de la hauteur)
  
      this.img.src = '/sac-freitag-noir-sans-background.png'
      this.img.onload = () => {
        this.loaded = true
        const ratio = this.img.height / this.img.width
        this.h = this.w * ratio
        if (this._onLoaded) {
          this._onLoaded()
        }
      }
    }
  
    onLoaded(cb) {
      this._onLoaded = cb
    }
  
    setBottomCentered(cssW, cssH) {
      if (!this.loaded) return
      
      this.x = (cssW - this.w) / 2
      this.y = cssH - this.h
    }
  
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
  
    getHitbox() {
      const hitW = this.w * this.hitboxScale
      const hitH = this.h * this.hitboxScale
      const offsetX = (this.w - hitW) / 2
      const offsetY = this.h * this.hitboxOffsetY // Décale vers le bas
      
      return {
        x: this.x + offsetX,
        y: this.y + offsetY,
        w: hitW,
        h: hitH
      }
    }
  
    draw(ctx, debug = false) {
      if (this.loaded) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        
        // Visualisation de la boîte de collision
        if (debug) {
          const hitbox = this.getHitbox()
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'
          ctx.lineWidth = 3
          ctx.strokeRect(hitbox.x, hitbox.y, hitbox.w, hitbox.h)
        }
      }
    }
  }