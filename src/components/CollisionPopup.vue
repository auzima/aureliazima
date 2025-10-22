<template>
  <div class="popup-overlay" @click.self="$emit('continue')">
    <div class="popup-content">
      <button class="close-btn" @click="$emit('continue')">&times;</button>
      
      <img v-if="image" :src="image" alt="Item" class="popup-image" />
      
      <h2 class="popup-title">{{ title }}</h2>
      
      <p class="popup-description">{{ description }}</p>
      
      <div class="popup-actions">
        <button class="btn btn-continue" @click="$emit('continue')">
          Continuer
        </button>
        <button class="btn btn-retry" @click="$emit('retry')">
          Recommencer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

defineEmits(['continue', 'retry'])
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  color: #666;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #000;
}

.popup-image {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 24px;
  border-radius: 8px;
}

.popup-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: #333;
  text-align: center;
}

.popup-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 32px 0;
  text-align: center;
}

.popup-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-continue {
  background: #4CAF50;
  color: white;
}

.btn-continue:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-retry {
  background: #f44336;
  color: white;
}

.btn-retry:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>