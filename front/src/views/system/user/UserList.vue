<template>
    <div>
        <el-button type="primary" size="default" @click="addBtn">新增</el-button>
        <sys-dialog
        :visible="dialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm">
            <template v-slot:content>
                <div>弹框内容</div>
            </template>
        </sys-dialog>
    </div>
</template>

<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue"
import {reactive} from "vue"
import useDialog from '@/hooks/useDialog'
const {dialog,onClose,onConfirm} =useDialog();
const addBtn=()=>{
    dialog.visible=true;
}

</script>

<style scoped>

</style>