<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import NoteList from './components/NoteList.vue'
  import useNotesStore from './stores/notes-store'

  const notesStore = useNotesStore()

  const addButtonClick = () => {
    notesStore.addNote('')
  }

  const isOnline = ref(navigator.onLine)

  onMounted(() => {
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('online', updateStatus)
    window.removeEventListener('offline', updateStatus)
  })

  function updateStatus() {
    isOnline.value = navigator.onLine
  }
</script>

<template>
  <main class="max-w-[800px] mx-auto my-[20px] px-[16px] flex flex-col">
    <h1 class="text-center text-[32px] mb-[20px]">Мои Заметки</h1>
    <Transition name="fade">
      <div
        v-if="!isOnline"
        class="sm:fixed sm:top-[84px] sm:left-1/2 sm:-translate-x-1/2 self-center mb-[40px] text-[18px] px-[12px] py-[4px] border rounded-[8px] bg-black text-white"
      >
        Офлайн-режим
      </div>
    </Transition>
    <button
      @click="addButtonClick"
      class="self-center sm:self-start bg-green-400 hover:bg-green-600 py-[8px] px-[16px] rounded-[8px] text-white mb-[30px] cursor-pointer"
    >
      Добавить
    </button>
    <NoteList />
  </main>
</template>

<style scoped>
  @media (max-width: 640px) {
    .fade-enter-active,
    .fade-leave-active {
      transition: all 1s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
      opacity: 1;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    top: 0;
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
