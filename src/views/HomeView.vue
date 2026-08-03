<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import type { User } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import UserService from '@/services/UserService'

const users = ref<User[] | null>(null)
const totalUsers = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalUsers.value / 3)
  return page.value < totalPages
})

watchEffect(() => {
  UserService.getUsers(3, page.value)
    .then((response) => {
      users.value = response.data
      totalUsers.value = response.headers['x-total-count']
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
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'home', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'home', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>