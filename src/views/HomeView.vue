<template>
  <div class="home">
    Hello there, {{userStore.user}}
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/user'
const userStore = useUserStore()
</script>
