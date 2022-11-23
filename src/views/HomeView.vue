<template>
  <div class="common-layout">
    <el-container v-if="userStore.isAuthenticated">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12"><div class="grid-content ep-bg-purple" />
            Hello there, {{userStore.user.user.username}}
          </el-col>
          <el-col :span="12"><div class="grid-content ep-bg-purple" />
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon><Setting /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button :loading="loadingLogout" :dark="true" plain type="primary" @click="doLogout">Logout</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup>
import {Setting} from '@element-plus/icons-vue'
import {useUserStore} from '@/stores/user'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const loadingLogout = ref(false)
const doLogout = async () => {
  loadingLogout.value = true
  await userStore.logoutUser()
  router.push({name:'Login'})
}
</script>
