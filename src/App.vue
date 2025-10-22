<template>
  <div>
    <CollisionPopup
      v-if="ui.popup.visible"
      :title="ui.popup.title"
      :description="ui.popup.description"
      :image="ui.popup.image"
      @continue="handleContinue"
      @retry="handleRetry"
    />
  </div>
</template>

<script setup>
import { uiStore as ui } from './stores/uiStore'
import CollisionPopup from './components/CollisionPopup.vue'

console.log('App.vue loaded') // Debug

function handleContinue() {
  console.log('Continue clicked') // Debug
  ui.popup.visible = false
  window.dispatchEvent(new CustomEvent('popup:continue'))
}

function handleRetry() {
  console.log('Retry clicked') // Debug
  ui.popup.visible = false
  window.dispatchEvent(new CustomEvent('popup:retry'))
}
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>