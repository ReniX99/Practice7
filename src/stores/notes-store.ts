import { defineStore } from 'pinia'
import type { INote } from '@/types/note'
import { computed, ref } from 'vue'

const useNotesStore = defineStore(
  'pinia',
  () => {
    const notes = ref<INote[]>([])

    const reversedNotes = computed(() => notes.value.slice().reverse())

    function addNote(text: string) {
      let id: number

      if (notes.value.length === 0) {
        id = 0
      } else {
        id = notes.value[notes.value.length - 1].id + 1
      }

      notes.value.push({
        id: id,
        text: text,
      })
    }

    function editNote(id: number, text: string) {
      const index = notes.value.findIndex((n) => n.id === id)

      notes.value[index].text = text
    }

    function deleteNote(id: number) {
      const index = notes.value.findIndex((n) => n.id === id)

      notes.value.splice(index, 1)
    }

    return { notes, reversedNotes, addNote, editNote, deleteNote }
  },
  { persist: true },
)

export default useNotesStore
