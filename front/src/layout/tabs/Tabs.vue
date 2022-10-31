<template>
    <el-tabs
    v-model="activeTab"
    type="card"
    @tab-click="clickBtn"
    closeable
    @tab-remove="removeTab">
        <el-tab-pane
        v-for="item in tabsList"
        :key="item.path"
        :label="item.title"
        :name="item.path">

        </el-tab-pane>

    </el-tabs>
</template>

<script setup lang="ts">
import {ref,computed,watch,onMounted} from "vue"
import {useRoute,useRouter} from "vue-router"
import {Tab,tabStore} from "@/store/tabs/index"
import {TabPaneName} from "element-plus"
//获取router和当前路由

const route=useRoute()
const router=useRouter()
const store=tabStore()

//获取tabs数据
const tabsList=computed(()=>{
    return store.getTabs;
})
//当前激活的选项卡，他跟当前激活的路由是一样的
const activeTab=ref("");
const setActiveTab=()=>{
    activeTab.value=route.path;
}
//删除选项卡
const removeTab=(targetName:TabPaneName)=>{
    if(targetName=='/dashboard') return;
    //选项卡数据列表
    const tabs=tabsList.value;
    let activeName=activeTab.value;
    if(activeName==targetName){
        tabs.forEach((tab:Tab,index:number)=>{
            if(tab.path===targetName){
                const nextTab=tabs[index+1] || tabs[index-1];
                if(nextTab){
                    activeName=nextTab.path;
                }
            }
        })
    }
    //重新设置当前激活的选项卡
    activeTab.value=activeName;
    //重新设置选项卡数据
    store.tabsList=tabs.filter((tab:Tab)=>tab.path!==targetName);
    //跳转路由
    router.push({path:activeName})
    // editableTabsValue.value=activeName;
    // editableTabs.value=tabs.filter((tab)=>tab.name!=targetName);
}
//添加选项卡
const addTab=()=>{
    //获取选项卡数据：当前路由
    //从当前路由获取path和title
    const {path,meta}=route;
    //通过vuex设置
    const tab:Tab={
        path:path,
        title:meta.title as string,
    }
    //添加到选项卡数据
    store.addTab(tab)
}
//监听路由，设置选项卡的数据
watch(
    ()=>route.path,
    ()=>{
        //把当前菜单设置到当前选项卡
        //设置激活的选项卡
        setActiveTab();
        //把当前路由添加到选项卡数据
        addTab()
    }
)
//解决刷新数据丢失的问题
const beforeRefresh=()=>{
    if(route.path!=='/login'){
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("tabsView",JSON.stringify(tabsList.value))
        })
        let tabSession=sessionStorage.getItem("tabsView");
        if(tabSession){
            let oldTabs=JSON.parse(tabSession)
            if(oldTabs.length>0){
                store.tabsList=oldTabs;
            }
        }
    })
}
</script>

<style scoped>
:deep(.el-tabs__header){margin:0}
:deep(.el-tabs__item){
    height:26px !important;
    line-height:26px !important;
    text-align:center!important;
    border:1px solid #d8dce5!important;
    margin:0 3px!important;
    color:#495060;
    font-size:12px!important;
    padding:0 10px!important;
}
:deep(.is-active){
    border-bottom:1px solid transparent!important;
    border:1px solid #42b983!important;
    background-color:#42b983!important;
    color:#fff!important;
}
:deep(.el-tabs__item:hover){
    color:#495060!important;
}
:deep(.el-tabs__nav-next){
    line-height:26px !important;
}
</style>