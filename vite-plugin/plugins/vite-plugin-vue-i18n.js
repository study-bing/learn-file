/*
 * @Author: linbin
 * @Date: 2022-01-11 13:28:54
 * @LastEditTime: 2022-01-11 14:08:48
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /myvite/vite-plugin/plugins/vite-plugin-vue-i18n.js
 */
export default function myI18n(){
    return {
        // code 代码， id 当前请求的链接
        transform(code, id){
            
            if(!/vue&type=i18n/.test(id)){
                return 
            }
            return `export default Comp => {
                console.log(Comp, 'Comp')
                Comp.i18n = ${code}
            }`
        }
    }
}