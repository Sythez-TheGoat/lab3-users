<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/types'
import UserService from '@/services/UserService'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const user = ref<User | null>(null)

onMounted(() => {
  UserService.getUser(Number(props.id))
    .then((response) => {
      user.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <nav>
      <RouterLink :to="{ name: 'user-profile-view' }">Profile</RouterLink>
      |
      <RouterLink :to="{ name: 'user-posts-view' }">Posts</RouterLink>
    </nav>
    <RouterView :user="user" />
  </div>
</template>