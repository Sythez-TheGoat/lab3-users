<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/types'
import UserService from '@/services/UserService'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const user = ref<User | null>(null)
const router = useRouter()

onMounted(() => {
  UserService.getUser(Number(props.id))
    .then((response) => {
      if (!response.data || Object.keys(response.data).length === 0) {
        router.push({
          name: '404-resource-view',
          params: { resource: 'user' },
        })
      } else {
        user.value = response.data
      }
    })
    .catch(() => {
      router.push({
        name: '404-resource-view',
        params: { resource: 'user' },
      })
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