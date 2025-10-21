export class Bag {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.w = 350
      this.h = 350
      this.speed = 250
      this.loaded = false
      this.img = new Image()
      this.img.src = '/sac-freitag-noir-sans-background.png'
      this.img.onload = () => {
        this.loaded = true
        const ratio = this.img.height / this.img.width
        this.h = this.w * ratio
      }
    }
  
    update(direction, dt) {
      this.x += direction.x * this.speed * dt
      this.y += direction.y * this.speed * dt
    }
  
    draw(ctx) {
      if (this.loaded)
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  }
  