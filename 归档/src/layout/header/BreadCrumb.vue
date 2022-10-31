<template>
    <div>
        <el-breadcrumb class="bred" separator="/">
            <el-breadcrumb-item v-for="item in tabs">
                {{item.meta.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>   
    </div>
</template>

<script setup lang="ts">
import {ref,watch,Ref} from "vue";
import {useRoute,RouteLocationMatched} from "vue-router"
//面包屑数据
const tabs:Ref<RouteLocationMatched[]>=ref([]);
//获取当前路由
const route=useRoute();
const getBreadcrumb=()=>{
    //从路由里面获取所有有meta和title
    let matched=route.matched.filter((item)=>item.meta && item.meta.title);
    //判断第一个是否是首页，不是，构造一个
    const first=matched[0];
    if(first.path!=='/dashboard'){
        //构造首页，并放到matched里面
        matched=[{path:"/dashboard",meta:{title:"首页"}} as any].concat(matched);
    }
    //设置面包屑导航的数据里面
    tabs.value=matched;
}
getBreadcrumb();
watch(
    ()=>route.path,
    ()=>getBreadcrumb()
)
</script>

<style scoped>
:deep(.el-breadcrumb__inner),:deep(.el-breadcrumb__inner a){
    color:#fff!important;
}
:deep(.el-breadcrumb__item){
    font-size:14px;
}
.bred{margin-left:20px;}
</style>