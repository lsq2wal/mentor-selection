<template>
  <div >
    <h1>欢迎来到导师选择页面</h1>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :Offset="0"
        @select="handleSelect"
        style="width: 800px"
      >
        <el-menu-item index="0">{{ username }}</el-menu-item>
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
      <div v-show="ifShow">
        <h2>您的导师姓名为{{ student.teacherName }}</h2>
      </div>
      <div v-show="!ifShow">
        <el-table :data="tableData" style="width: 800">
          <el-table-column label="Name" width="180">
            <template #default="scope">
              <el-popover
                effect="light"
                trigger="hover"
                placement="top"
                width="auto"
              >
                <template #default>
                  <div>name: {{ scope.row.name }}</div>
                  <div>title: {{ scope.row.title }}</div>
                </template>
                <template #reference>
                  <el-tag>{{ scope.row.name }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="带学生总数" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">
                  {{ scope.row.stuNumber }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="已选学生数" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">
                  {{ scope.row.studentList?.length ?? '0' }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Operations" width="180">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="chooseTea(scope.$index)"
              >
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Student, Teacher } from '@/datasource/Types'
import { useStore } from '@/store'
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useStore()
const tableData = store.teachers
const students = store.students
const teachers = store.teachers
console.log(teachers[0])
const student = ref<Student>({
  teacherSelect: false,
})
const username = sessionStorage.getItem('name')
for (let i = 0; i < students.length; i++) {
  if (students[i].name == username) {
    student.value.name = students[i].name
    student.value.password = students[i].password
    student.value.teacherName = students[i].teacherName
    student.value.teacherSelect = students[i].teacherSelect
  }
}
const ifShow = ref(student.value.teacherSelect)

const chooseTea = (index: number) => {
  if (student.value.teacherName) {
    alert('无法选择多个导师')

  }
  else if(teachers[index].studentList?.length == teachers[index].stuNumber) {
    alert('已满，请重新选择')
  }
  else {
    store.addStudent(username ?? '', teachers[index].name ?? '')
    alert('导师选择成功')
    student.value.teacherName = teachers[index].name
    console.log(store.students[0])
    console.log(store.teachers[1])
  }
  
}
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
