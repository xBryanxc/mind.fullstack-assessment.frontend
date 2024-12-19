<template>
  <button 
    class="action-button"
    @click="$emit('click')"
  >
    {{ props.text }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.action-button {
  background-color: #9ED5A0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #8BC68D;
}
</style> 