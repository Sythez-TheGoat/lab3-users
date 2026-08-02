<script setup lang="ts">
import type { User } from '@/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <RouterLink class="user-link" :to="{ name: 'user-layout-view', params: { id: user.id } }">
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <span>{{ user.email }}</span>
      <p>{{ user.company.name }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.user-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.user-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.user-link {
  text-decoration: none;
  color: inherit;
}
</style>