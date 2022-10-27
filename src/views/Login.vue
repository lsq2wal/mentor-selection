<template>
  <div class="container">
    <div class="data">
      <h3>学生账号:</h3>
      <el-table :data="students" style="width: 100%">
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="number" label="Number" width="180" />
        <el-table-column prop="password" label="PassWord" width="180" />
      </el-table>
      <h3>教师账号:</h3>
      <el-table :data="teachers" style="width: 100%">
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="number" label="Number" width="180" />
        <el-table-column prop="password" label="PassWord" width="180" />
      </el-table>
    </div>
    <div class="login">
      <h1 style="left: 10px">登录</h1>
      <el-input
        type="text"
        v-model="userForm.number"
        placeholder="Please input"
        style="margin: 5px"
      />
      <br />
      <el-input
        v-model="userForm.password"
        type="password"
        placeholder="Please input password"
        show-password
        style="margin: 5px"
      />
      <br />
      <el-button
        type="primary"
        title="button"
        @click="login"
        style="margin: 5px"
      >
        Login
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { useStore } from '@/store'

const store = useStore()
store.getlistStudents()
store.getlistTeachers()
const userForm = ref({ number: '', password: '' })

const login = () => {
  const user = {
    number: userForm.value.number,
    password: userForm.value.password,
  }
  store.login(user)

  userForm.value.number = ''
  userForm.value.password = ''
}
const students = store.students
const teachers = store.teachers
</script>

<style scoped>
.container {
  height: 800px;
  width: 1350px;
  top: 0px;
}
.data {
  height: 600px;
  width: 500px;
  top: 100px;
  left: 50px;
}
.login {
  position: absolute;
  height: 200px;
  width: 400px;
  left: 700px;
  top: 200px;
}
</style>
