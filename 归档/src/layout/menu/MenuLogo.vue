<template>
    <div class="logo">
        <img :src="menuLogo" alt="logo" />
        <span class="logo-title" v-if="show">{{title}}</span>
        <!-- <span class="logo-title" v-if="!props.isCollapsed">{{title}}</span> -->
    </div>
</template>

<script setup lang="ts">
import menuLogo from "@/assets/logo.png"
import {ref,watch} from "vue"
const title=ref("健身房管理系统")
//接收父组件传递等值
const props=defineProps({
    isCollapsed:{
        require:true,
        type:Boolean
    }
})

const show=ref(true);
watch(
    ()=>props.isCollapse,
    (collapsed:boolean)=>{
        if(!collapsed){
            setTimeout(()=>{
                show.value=!collapsed;
            },300)
        }else{
            show.value=!collapsed;
        }
    }
)
</script>

<style scoped lang="scss">
.logo{
    display:flex;
    width:100%;
    height:50px;
    line-height:50px;
    background:#2b2f3a;
    text-align:center;
    align-items:center;
    cursor:pointer;
    color:#fff;
    img{
        width:36px;
        height:36px;
        margin-right:12px;
        margin-left:20px;
    }
    .logo-title{
        font-weight:800px;
        line-height:50px;
        font-size:22px;
    }
}
</style>