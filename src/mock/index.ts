import axios from '@/axios'
import MockAdapter from 'axios-mock-adapter'
import type { ResultVO } from '@/datasource/Types'
import * as consty from '@/datasource/Const'
import { useStore } from '@/store'


const mock = new MockAdapter(axios)
function path(p: string) {
  const reg = p.replace(/{\w+}/g, '(\\w+)').replace(/\//g, '\\/') + '$'
  return new RegExp(reg)
}

const resulVO: ResultVO = {
  code: 200,
  data: {},
}

mock.onPost('login').reply((c) => {
  const data = c.data
  const { number, password } = JSON.parse(data)
  
  const store = useStore()
  if (number == password) {
    store.exception = '账号密码相同，请修改密码'
  }
  const students = store.students
  const teachers = store.teachers
  for (let i = 0; i < students.length; i++){
    if (number == students[i].number && password == students[i].password) {
    resulVO.code = 200
    resulVO.data = {}
    return [
      200,
      resulVO,
      {
        token:
          '744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6',
        role: consty.STUDENT_ROLE,
        name:students[i].name
        
      },
    ]
  }}
  for (let i = 0; i < teachers.length; i++){
    if (number == teachers[i].number && password == teachers[i].password) {
    resulVO.code = 200
    resulVO.data = {}
    return [
      200,
      resulVO,
      {
        token:
          '744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6',
        role: consty.TEACHER_ROLE,
        name:teachers[i].name
      },
    ]
  }
    
  }
  resulVO.code = 401
  resulVO.message = '用户名密码错误'
  return [200, resulVO]
})


