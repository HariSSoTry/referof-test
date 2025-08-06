<template>
  <button @click="openModal" class="open-modal-button">
    Создать промокод
  </button>
  
  <PromoCodeModal 
    :isOpen="isModalOpen" 
    @close="closeModal" 
    @submit="handleSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PromoCodeModal from './PromoCodeModal.vue';

export default defineComponent({
  name: 'PromoCodeCreator',
  components: {
    PromoCodeModal,
  },
  setup() {
    const isModalOpen = ref(false);
    
    const openModal = () => {
      isModalOpen.value = true;
    };
    
    const closeModal = () => {
      isModalOpen.value = false;
    };
    
    const handleSubmit = (formData: any) => {
      console.log('Данные формы:', formData);
      // Здесь можно добавить логику отправки данных на сервер
    };
    
    return {
      isModalOpen,
      openModal,
      closeModal,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.open-modal-button {
  padding: 12px 24px;
  background-color: #107FD1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.open-modal-button:hover {
  background-color: #0a5d9c;
}
</style>