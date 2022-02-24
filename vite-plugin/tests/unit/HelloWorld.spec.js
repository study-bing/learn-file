import { mount } from '@vue/test-utils'
import Hello from '../../src/components/helloWorld.vue'

it('content', () => {
	const Comp = {
		template: `<div><Hello /></div>`,
        components: {
            Hello
        }
	}
	const wrapper = mount(Comp)
	// 最简单的测试用例查看是否包含Hello Jest文字。
	expect(wrapper.findComponent({ name: 'HelloWorld' }).text()).toContain('Hello Jest')
})
