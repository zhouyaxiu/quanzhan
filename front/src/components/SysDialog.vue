<template>
    <el-dialog
    v-model="visible"
    :title="title"
    :width="width+'px'"
    :before-close="onClose"
    append-to-body
    :close-on-click-modal="false">
    <div class="container" :style="{height:height+'px'}">
        <slot name="content"></slot>
    </div>
        <template #footer>
            <span>
                <el-button @click="onClose">取消</el-button>
                <el-button @click="onConfirm">confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//定义弹框参数类型
interface DialogProps{
    title:string,
    visible:boolean,
    width:number,
    height:number
}
//接收父组件传递数据
//withDefaults：设置参数的默认值
const props=withDefaults(defineProps<DialogProps>(),{
    title:'标题',
    visible:false,
    width:630,
    height:280
})
//注册事件
const emit=defineEmits(['onClose','onConfirm'])
const onClose=()=>{
    emit('onClose')
}
const onConfirm=()=>{
    emit('onConfirm')
}
</script>

<style scoped lang="scss">
.container{overflow-x:initial;overflow-y:auto;}
.el-dialog{
    border-top-left-radius:7px!important;
    border-top-right-radius:7px!important;
    .el-dialog__header{
        margin-right:0;
        border-top-left-radius:7px!important;
        border-top-right-radius:7px!important;
        background-color:#009688!important;
        .el-dialog__title{
            color:#fff;
            font-size:16px;
            font-weight:600;
        }
    }
    .el-dialog__headerbtn{
        .el-dialog__close{
            color:#fff
        }
    }
    .el-dialog__body{
        padding:10px;
    }
    .el-dialog__footer{
        border-top:1px solid #e8eaec!important;
        padding:10px;
    }
}

</style>