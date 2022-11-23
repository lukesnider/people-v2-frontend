<template>
 <router-view/>
</template>
<script setup>
import {useUserStore} from '@/stores/user'
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
if(
  !useUserStore().isAuthenticated &&
  route.name !== 'Login' &&
  route.name !== 'Register'
) {
  router.push({name:'Login'})
}
</script>