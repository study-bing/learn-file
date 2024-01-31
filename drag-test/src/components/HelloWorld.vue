<script setup>
import { ref, onMounted } from "vue"
const components = ref([
    {
        label: "文本",
        type: "div",
        com: "div",
    },
    {
        label: "按钮",
        type: "btn",
    },
])
const componentsMap = ref({
    div: {
        label: "文本",
        type: "div",
    },
    btn: {
        label: "按钮",
        type: "btn",
        com: ElButton,
    },
})
const list = ref([])
const canvasRef = ref()
let curCom = null
const overFn = (e) => {
    e.preventDefault()
}
const dropFn = (e) => {
    console.log(e)
    e.preventDefault()
    const { offsetX, offsetY } = e
    list.value.push({
        left: offsetX + "px",
        top: offsetY + "px",
        ...curCom,
    })
}
const dragenter = (e) => {
    console.log(e)
    e.dataTransfer.dropEffect = "move"
}
const dragleave = (e) => {
    e.dataTransfer.dropEffect = "none"
}
const dragstart = (e, com) => {
    curCom = com
    canvasRef.value.addEventListener("dragover", overFn)
    canvasRef.value.addEventListener("drop", dropFn)
    canvasRef.value.addEventListener("dragenter", dragenter)
    canvasRef.value.addEventListener("dragleave", dragleave)
    console.log(e)
}
const dragend = (e) => {
    canvasRef.value.removeEventListener("dragover", overFn)
    canvasRef.value.removeEventListener("drop", dropFn)
    canvasRef.value.removeEventListener("dragenter", dragenter)
    canvasRef.value.removeEventListener("dragleave", dragleave)
}

</script>
<!--  -->
<template>
    <div class="content">
        <div class="left-box">
            <div
                class="left-item"
                draggable="true"
                @dragstart="(e) => dragstart(e, item)"
                @dragend="dragend"
                v-for="item in components"
                :key="item.type"
            >
                {{ item.label }}
            </div>
        </div>
        <div class="right-box"><el-button>Default</el-button></div>
        <div class="top-box">{{ list }}</div>
        <div class="body">
            <div class="body-content">
                <div class="body-content-canvas" ref="canvasRef">
                    <div
                        class="component"
                        v-for="item in list"
                        :key="item.type"
                        :style="{ left: item.left, top: item.top }"
                    >
                        <div v-if="item.type === 'div'">{{ item.label }}</div>
                        <el-button v-if="item.type === 'btn'"
                            >Default</el-button
                        >
                        <component :is="item.com"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 24px;
}
.left-box {
    position: absolute;
    left: 24px;
    top: 24px;
    bottom: 24px;
    width: 200px;
    background-color: red;
    .left-item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border: 1px solid #fff;
        user-select: none;
        cursor: move;
    }
}
.right-box {
    position: absolute;
    right: 24px;
    top: 24px;
    bottom: 24px;
    width: 200px;
    background-color: blue;
}
.top-box {
    position: absolute;
    left: 224px;
    right: 224px;
    top: 24px;
    height: 200px;
    background-color: rgb(94, 190, 94);
}
.body {
    width: 100%;
    height: 100%;
    background-color: yellow;
    padding: 200px;
    padding-bottom: 0px;
    &-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        &-canvas {
            position: relative;
            width: 1000px;
            height: 1000px;
        }
    }
}
.component {
    position: absolute;
    font-size: 14px;
}
</style>
