<template>
  <div class="common-layout">
    <el-container>
      <el-header>Well hello there, person! Login</el-header>
      <el-main>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6"
            ><div class="grid-content ep-bg-purple"
            />
                <label for="email" >Email Address</label>
               <el-input id="email" v-model="email" type="email"/>
            </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6"
            ><div class="grid-content ep-bg-purple"
            />
                <label for="password" >Password</label>
                <el-input
                    id="password"
                    v-model="password"
                    type="password"
                    show-password
                />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="6"
            ><div class="grid-content ep-bg-purple"
            />
                <el-button :loading="loading" :dark="true" plain type="primary" @click="loginUser">Login</el-button>
            </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useNakamaStore} from '@/stores/nakama'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const loginUser = async () => {
  try{
    loading.value = true
    let response = await useNakamaStore().client.authenticateEmail(email.value,password.value)
    await useNakamaStore().storeSession(response)
    router.push({name:'Home'})
  }catch(err){
    console.log(err)
    ElNotification({
      title: `Error: ${err.status}`,
      message: `${err.statusText}`,
      type: 'error',
    })
  }
  loading.value = false
}
</script>