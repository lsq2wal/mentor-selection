<template>
  <div>
    <h1>请修改你的密码</h1>
    <el-input
      type="text"
      v-model="password"
      placeholder="Please input"
      style="margin: 5px"
    />
    <br />
    <el-input
      type="text"
      v-model="newPassword"
      placeholder="Please input again"
      style="margin: 5px"
    />
    <br />
    <el-button
      type="primary"
      title="button"
      @click="submit"
      style="margin: 5px"
    >
      确认
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useStore } from '@/store'
import { ref } from 'vue'

const userName = sessionStorage.getItem('name')
const password = ref('')
const newPassword = ref('')
const store = useStore()
const submit = () => {
  if (
    password.value != newPassword.value ||
    !password.value ||
    !newPassword.value
  ) {
    alert('两次输入需一致且不能为空')
    password.value = ''
    newPassword.value = ''
  } else {
    store.changePassword(userName ?? '', password.value)
    alert('密码修改成功')
    router.push('/')
  }
}
</script>
