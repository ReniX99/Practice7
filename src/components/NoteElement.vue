<script setup lang="ts">
  import DeleteLogo from '@/assets/svg/DeleteLogo.vue'
  import EditLogo from '@/assets/svg/EditLogo.vue'
  import useNotesStore from '@/stores/notes-store'
  import type { INote } from '@/types/note'
  import { nextTick, ref, watch } from 'vue'

  const notesStore = useNotesStore()

  const props = defineProps<{
    note: INote
  }>()

  const inputText = ref<string>('')

  const isEditing = ref<boolean>(props.note.isCreated ? true : false)
  const textarea = ref<HTMLTextAreaElement | null>(null)

  const autoResize = (): void => {
    const el = textarea.value
    if (el) {
      el.style.height = el.scrollHeight + 'px'
    }
  }

  const changeState = () => {
    isEditing.value = !isEditing.value
  }

  watch(isEditing, (value) => {
    if (value) {
      inputText.value = props.note.text
      nextTick(() => autoResize())
    }
  })

  const saveButtonClick = () => {
    notesStore.editNote(props.note.id, inputText.value)
    isEditing.value = false
  }
</script>

<template>
  <div
    class="border rounded-[8px] p-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex flex-col gap-[10px]"
  >
    <div class="flex justify-between items-start gap-[20px]">
      <textarea
        v-if="isEditing"
        v-model="inputText"
        @input="autoResize"
        ref="textarea"
        class="text-[20px] resize-none w-full overflow-hidden outline-[2px] rounded-[6px]"
      ></textarea>

      <p v-else class="text-[20px]">{{ note.text }}</p>

      <div class="flex gap-[12px] items-start">
        <button @click="changeState" class="bg-orange-400 rounded-[6px] p-[2px] cursor-pointer">
          <EditLogo />
        </button>
        <button
          @click="notesStore.deleteNote(note.id)"
          class="bg-red-500 rounded-[6px] p-[2px] cursor-pointer"
        >
          <DeleteLogo />
        </button>
      </div>
    </div>
    <button
      v-if="isEditing"
      @click="saveButtonClick"
      class="self-center bg-green-400 py-[8px] px-[16px] rounded-[8px] text-white cursor-pointer"
    >
      Сохранить
    </button>
  </div>
</template>
