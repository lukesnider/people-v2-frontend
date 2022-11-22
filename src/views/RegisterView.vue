<template>
  <div class="common-layout">
    <el-container>
      <el-header>Welcome, person!</el-header>
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
                <label for="username" >Username</label>
               <el-input id="username" v-model="username" type="text"/>
            </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6"
            ><div class="grid-content ep-bg-purple"
            />
                <el-button :loading="loading" :dark="true" plain type="primary" @click="registerUser">Complete Registration</el-button>
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

const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)
const registerUser = async () => {
    loading.value = true
    let response = await useNakamaStore().client.authenticateEmail(email.value,password.value,true,username.value)
    await useNakamaStore().storeSession(response)
    loading.value = false
    useRouter().push({name:'Home'})
}
</script>