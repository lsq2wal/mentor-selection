<template>
  <div>
    <h1>欢迎来到教师页面</h1>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index=" 0">{{ username }}</el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="1">
          <template #title>更多</template>
          <el-menu-item index="1-1">
            <router-link to="/changePassword">修改密码</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/">退出</router-link>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div>
      <el-table :data="teacher.studentList" style="width: 100%">
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="specialty" label="specialty" width="180" />
        <el-table-column prop="GPA" label="GPA" width="180" />
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Teacher } from '@/datasource/Types'
import { useStore } from '@/store'
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useStore()
const teachers = store.teachers
const teacher = ref<Teacher>({})
const username = sessionStorage.getItem('name')
for (let i = 0; i < teachers.length; i++) {
  if (teachers[i].name == username) {
    teacher.value.name = teachers[i].name
    teacher.value.password = teachers[i].password
    teacher.value.studentList = teachers[i].studentList
    teacher.value.stuNumber = teachers[i].stuNumber
    teacher.value.title = teachers[i].title
  }
}
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
