import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myExample from './plugins/my-example'
import myI18n from './plugins/vite-plugin-vue-i18n'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		myExample(),
        myI18n()
	]
})
