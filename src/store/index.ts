import axios from '@/axios'
import * as consty from '@/datasource/Const'
import router from '@/router'

import type { ResultVO, Student, Teacher } from '@/datasource/Types'
import { defineStore } from 'pinia'
import { listStudents, listTeachers } from '@/datasource/DataSource'

export const useStore = defineStore('state', {
  state: () => ({
    student: {} as Student,
    teacher: {} as Teacher,
    message: '' as string,
    exception: '' as string,
    students: [] as Student[],
    teachers: [] as Teacher[]
  }),
  // ---------------- Actions -----------------
  actions: {
    getlistStudents(){
      if(this.students.length==0){
          this.students=listStudents()
      }
      return this.students
    },
     getlistTeachers(){
      if(this.teachers.length==0){
        this.teachers = listTeachers()
      }
      return this.teachers
    },
    addStudent(sName:string,tName:string){
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].name == sName) {
          this.students[i].teacherSelect = true
          this.students[i].teacherName = tName
          for (let j = 0; j < this.teachers.length; j++) {
            if (this.teachers[j].name ==tName) {
              this.teachers[j].studentList?.push(this.students[i])
              console.log("push")
            }
          }
        }
      }
    },
    changePassword(userName: string, passWord: string) {
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].name == userName) {
          this.students[i].password =passWord
        }
      }
      for (let i = 0; i < this.teachers.length; i++){
        if (this.teachers[i].name == userName) {
          this.teachers[i].password = passWord
        }
      }
    },
   
    async login(user: { number: string; password: string }) {
      // try可避免控制台的未捕获异常信息
      try {
        const resp = await axios.post<ResultVO>('login', user)
        sessionStorage.setItem('token', resp.headers.token)
        sessionStorage.setItem('role', resp.headers.role)
        sessionStorage.setItem('name', resp.headers.name)
        let path = '/'
        switch (resp.headers.role) {
          case consty.STUDENT_ROLE:
            path = '/student'
            break
          case consty.TEACHER_ROLE:
            path = '/teacher'
            break
        }
        router.push(path)
      } catch (error) {
        // eslint默认禁止空执行体。加一段注释或关闭该检测
      }
    },
  },
})
