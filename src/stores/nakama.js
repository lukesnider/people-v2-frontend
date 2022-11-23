import { defineStore } from 'pinia'
import {Client,Session} from "@heroiclabs/nakama-js"
import {useUserStore} from '@/stores/user'
export const useNakamaStore = defineStore('nakama', {
    state: () => ({ 
        client: false,
        session: false,
        socket: false,
        sessionStorageKey: 'people-nakama-session'
    }),
    getters: {
    },
    actions: {
        async logout() {

        },
        async clearSession() {
            await this.client.sessionLogout(this.session);
            await localStorage.removeItem(this.sessionStorageKey)
            this.session = false
        },
        async storeSession(session) {
            await localStorage.setItem(this.sessionStorageKey,JSON.stringify(session))
        },
        async getSession() {
            let session = await localStorage.getItem(this.sessionStorageKey)
            if(!session) {
                return false
            }
            session = JSON.parse(session)
            return Session.restore(session.token,session.refresh_token)
        },
        async load() {
            this.client = new Client(process.env.VUE_APP_NAKAMA_KEY, process.env.VUE_APP_NAKAMA_HOST, process.env.VUE_APP_NAKAMA_PORT)
            let session = await this.getSession()
            if (session && ( session.isexpired || session.isexpired(Date.now + 1) )){
                try {
                    this.session = await this.client.sessionRefresh(session)
                    await this.storeSession(session)
                    this.socket = this.client.createSocket()
                    await this.socket.connect(this.session, true)
                    await useUserStore().setUser(await this.client.getAccount(this.session))
                    console.log('the session was refreshed successfully')
                } catch (error) {
                    await this.clearSession()
                    console.log('the session was cleared')
                }
            }
        },
    },
  })