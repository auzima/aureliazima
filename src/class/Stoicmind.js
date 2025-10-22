export class Stoicmind {
    constructor(x, y, width = 180, speed = 160, meta = {}) {
      this.x = x
      this.y = y
      this.w = width
      this.h = width
      this.speed = speed
      this.frozen = false
      this.loaded = false
      this.img = new Image()
      this._onLoaded = null
      this.hitboxScale = 0.25 // Réduit la hitbox à 60% de la taille
      this.hitboxOffsetY = 0.3 // Décale la hitbox vers le bas (30% de la hauteur)
  
      this.title = meta.title ?? 'Stoicmind'
      this.description = meta.description ?? "Un esprit qui traverse l'écran."
  
      this.img.src = '/fantome.png'
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
  
    freeze() {
      this.frozen = true
    }
  
    unfreeze() {
      this.frozen = false
    }
  
    centerOn(rect) {
      this.x = rect.x + (rect.w - this.w) / 2
      this.y = rect.y + (rect.h - this.h) / 2
    }
  
    getHitbox() {
      const hitW = this.w * this.hitboxScale
      const hitH = this.h * this.hitboxScale
      const offsetX = (this.w - hitW) / 2
      const offsetY = (this.h - hitH) / 2
      
      return {
        x: this.x + offsetX,
        y: this.y + offsetY,
        w: hitW,
        h: hitH
      }
    }
  
    update(dt, cssW, cssH) {
      if (!this.loaded || this.frozen) return
  
      this.y += this.speed * dt
  
      if (this.y > cssH) {
        this.y = -this.h
        this.x = Math.random() * (cssW - this.w)
      }
    }
  
    draw(ctx, debug = false) {
      if (this.loaded) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        
        // Visualisation de la boîte de collision
        if (debug) {
          const hitbox = this.getHitbox()
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)'
          ctx.lineWidth = 3
          ctx.strokeRect(hitbox.x, hitbox.y, hitbox.w, hitbox.h)
        }
      }
    }
  }