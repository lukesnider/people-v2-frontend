import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import { useUserStore } from '@/stores/user'
import { useNakamaStore } from '@/stores/nakama'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'


const CheckAuth = async () => {
    console.log('slkdjfalskdjf')
    console.log(router)
    // console.log('beforeeach')
    // const userStore = useUserStore()
    // if (
    //   !userStore.isAuthenticated &&
    //   ( to.name !== 'Login' && to.name !== 'Register' )
    // ) {
    //   return { name: 'Login' }
    // }
}
const RunApp = async () => {
    const pinia = createPinia()
    const Application = createApp(App)
        .use(pinia)
        .use(router)
        .use(ElementPlus)
    const nakama = useNakamaStore()
    await nakama.load()
    router.beforeEach(async () => {
        await CheckAuth()
    })
    Application.mount('#app')
}
RunApp()

