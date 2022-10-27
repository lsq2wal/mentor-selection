
export interface Student{
  number?: string
  password?: string
  name?: string
  specialty?: string,
  GPA?:number
  teacherName?: string
  teacherSelect?:boolean
}

export interface Teacher{
  number?: string
  password?: string
  name?: string
  studentList?: Student[]
  stuNumber?: number
  title?:string
}

export interface ResultVO {
  code: number
  message?: string
  data?: any
}
