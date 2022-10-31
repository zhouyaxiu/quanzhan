<template>
    <menuLogo :isCollapsed="isCollapse"></menuLogo>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened
        background-color="#304156" router>
        <menu-item :menuList="menuList"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
//reactive:定义响应式数据（复杂类型）
//ref:定义响应式数据（基本类型）
import MenuItem from "@/layout/menu/menuItem.vue";
import menuLogo from "@/layout/menu/menuLogo.vue";
import { collapseStore } from "@/store/collapse/index";
const colstore = collapseStore();

const isCollapse = computed(() => {
    return colstore.getCollapse;
});

const route = useRoute();
//当前激活的菜单
const activeIndex = computed(() => {
    const { path } = route;
    return path;
})
// 树形的菜单数据
let menuList = reactive([
    {
        path: "/dashboard",
        component: "/dashboard/index",
        name: "dashboard",
        meta: {
            title: "首页",
            icon: 'HomeFilled',
            roles: ["sys:dashboard"]
        }
    },
    {
        path: "/system",
        component: "Layout",
        name: "system",
        meta: {
            title: '系统管理',
            icon: "Setting",
            roles: ["sys:manage"]
        },
        children: [
            {
                path: "/userList",
                component: "/system/user/UserList",
                name: "userList",
                meta: {
                    title: "员工管理",
                    icon: 'UserFilled',
                    roles: ["sys:user"]
                }
            },
            {
                path: "/roleList",
                component: "/system/role/RoleList",
                name: 'roleList',
                meta: {
                    title: "角色管理",
                    icon: "Wallet",
                    roles: ["sys:role"]
                }
            },
            {
                path: '/menuList',
                component: "/system/menu/MenuList",
                name: "menuList",
                meta: {
                    title: '菜单管理',
                    icon: "Menu",
                    roles: ["sys:menu"]
                }
            }
        ]
    },
    {
        path: "/menuRoot",
        component: "Layout",
        name: "memberRoot",
        meta: {
            title: '会员管理',
            icon: "Setting",
            roles: ["sys:memberRoot"]
        },
        children: [
            {
                path: '/cardType',
                component: "/member/type/CardType",
                name: "cardType",
                meta: {
                    title: "会员卡类型",
                    icon: 'UserFilled',
                    roles: ["sys:cardType"]
                }
            },
            {
                path: "/memberList",
                component: "/member/list/MemberList",
                name: "memberList",
                meta: {
                    title: "会员管理",
                    icon: "Wallet",
                    roles: ["sys:memberList"]
                }
            },
            {
                path: "/myFee",
                component: "/member/fee/FeeList",
                name: "myFee",
                meta: {
                    title: "我的充值",
                    icon: "Menu",
                    roles: ["sys:myFee"]
                }
            }
        ]
    }
]);
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
}

.el-menu {
    border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title) {
    color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item) {
    color: #bfcbd9
}

:deep(.el-menu-item.is-active) {
    color: #409eff !important;
}

:deep(.is-opend .el-menu-item) {
    background-color: #1f2d3d !important
}

:deep(.el-menu-item:hover) {
    background-color: #001528 !important;
}
</style>