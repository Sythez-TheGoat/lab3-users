<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue'
import type { User } from '@/types'
import PostService from '@/services/PostService'

interface Post {
  id: number
  title: string
  body: string
}

const props = defineProps<{
  user: User
}>()

const { user } = toRefs(props)
const posts = ref<Post[] | null>(null)

onMounted(() => {
  PostService.getPostsByUser(user.value.id)
    .then((response) => {
      posts.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>