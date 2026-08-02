<script setup lang="ts">
withDefaults(
  defineProps<{
    resource?: string
  }>(),
  {
    resource: 'page',
  },
)
</script>

<template>
  <h1>404</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <RouterLink :to="{ name: 'home' }">Back to the home page</RouterLink>
</template>