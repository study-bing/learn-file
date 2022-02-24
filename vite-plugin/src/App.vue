<template>
	<form>
		<label>{{ t('language') }}</label>
        {{locale}}
		<select v-model="locale">
			<option value="en">en</option>
			<option value="ja">ja</option>
		</select>
	</form>
	<p>{{ t('hello') }}</p>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue'
export default {
	name: 'App',
	setup() {
		const ins = getCurrentInstance()
		console.log(ins)
		function useI18n() {
			const locale = ref('en')
			const i18n = ins.type.i18n
			const t = (msg) => {
				return computed(() => {
					return i18n[locale.value][msg]
				})
			}
			return {
				locale,
                t
			}
		}
		const { locale, t } = useI18n()
		return { locale, t }
	}
}
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
