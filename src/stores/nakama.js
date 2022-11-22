import { defineStore } from 'pinia'
import {Client} from "@heroiclabs/nakama-js"

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
            await localStorage.removeItem(this.sessionStorageKey)
            console.log('the session was cleard')
        },
        async storeSession(session) {
            await localStorage.setItem(this.sessionStorageKey,session)
        },
        async load() {
            this.client = new Client(process.env.VUE_APP_NAKAMA_KEY, process.env.VUE_APP_NAKAMA_HOST, process.env.VUE_APP_NAKAMA_PORT)
            let session = await localStorage.getItem(this.sessionStorageKey)
            if (session &&( session.isexpired || session.isexpired(Date.now + 1) )){
                try {
                    // Attempt to refresh the existing session.
                    this.session = await this.client.sessionRefresh(session)
                    await this.storeSession(session)
                    this.socket = this.client.createSocket()
                    await this.socket.connect(this.session, true)
                    console.log('the session was refreshed successfully')
                } catch (error) {
                    //reset everyting and force login
                    await this.clearSession()
                }
            }
        },
    },
  })