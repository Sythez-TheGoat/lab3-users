<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import type { User } from '@/types'
import { ref, onMounted } from 'vue'
import UserService from '@/services/UserService'

const users = ref<User[] | null>(null)

onMounted(() => {
  UserService.getUsers()
    .then((response) => {
      users.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Users</h1>
  <div class="users">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>