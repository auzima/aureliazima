import { reactive } from 'vue'

export const uiStore = reactive({
  popup: {
    visible: false,
    title: '',
    description: '',
    image: ''
  }
})