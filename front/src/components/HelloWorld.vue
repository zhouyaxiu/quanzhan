<script setup lang="ts">
import {computed} from "vue"
import {storeToRefs} from "pinia"
import {testStore} from "@/store/test/index"
const store=testStore()
//方式一
// const {count}=storeToRefs(store)
//方式二
const count=computed(()=>{
  return store.count;
})
const addBtn=()=>{
  //方式一
  // store.count++
  //方式二
  // store.setCount(++store.count);
  //方式三
  // store.$patch({
  //   count:++store.count
  // })
  //方式四
  store.$patch((state)=>{
    state.count=++state.count
  })
}
</script>

<template>
  <h1>{{ count }}</h1>
<button @click="addBtn">新增</button>

</template>

<style scoped>

</style>
