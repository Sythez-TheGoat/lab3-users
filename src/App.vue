<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <nav>
        <RouterLink to="/">Users</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
nav {
  padding: 30px;
}

@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>