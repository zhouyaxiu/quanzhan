<template>
    <el-container class="layout">
        <el-aside width="auto" class="aside">
            <menu-bar></menu-bar>
        </el-aside>
        <el-container>
            <el-header class="header" height="50px">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Tabs stype="padding:0 20px"></Tabs>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from "@/layout/header/Header.vue"
import MenuBar from "@/layout/menu/MenuBar.vue"
import MenuItem from "@/layout/menu/MenuItem.vue"
import Tabs from "./tabs/Tabs.vue"
</script>

<style lang="scss" >
.layout{
    height:100%;
    .aside{
        background-color:#304156;
    }
    .header{
        background-color:#009688;
        display:flex;
        align-items:center;
    }
    .main{
        padding-top:1px;
        padding-left:0 !important;
        padding-right:0!important;
        background-color:darkgoldenrod;
    }
}
</style>