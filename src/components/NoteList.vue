<script setup lang="ts">
  import useNotesStore from '@/stores/notes-store'
  import NoteElement from './NoteElement.vue'
  import { vAutoAnimate } from '@formkit/auto-animate'
  import { storeToRefs } from 'pinia'

  const notesStore = useNotesStore()
  const { reversedNotes } = storeToRefs(notesStore)
</script>

<template>
  <section v-auto-animate class="flex flex-col gap-[20px]">
    <NoteElement v-for="note in reversedNotes" :key="note.id" :note="note" />
  </section>
</template>
