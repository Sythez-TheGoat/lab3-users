<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import type { User } from '@/types'

const props = defineProps<{
  user: User
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { user } = toRefs(props)

const router = useRouter()
const store = useMessageStore()

const edit = () => {
  store.updateMessage(`Updating ${props.user.name}'s details...`)
  setTimeout(() => {
    store.resetMessage()
    router.push({ name: 'home' })
  }, 5000)
}
</script>

<template>
  <p>Edit user here</p>
  <button @click="edit">Update</button>
</template>