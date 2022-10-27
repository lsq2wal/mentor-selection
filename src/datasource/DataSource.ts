import type { Student, Teacher } from "./Types";


export function listStudents():Student[]{
    const students: Student[] = [
        {
            number: "2019214381", password: "2019214381", name: "Alston",
            specialty: "软件工程",GPA:89.00, teacherSelect: false
        },
        {
            number: "2019214389", password: "2019214389", name: "Vivian",
            specialty:"计算机科学与技术",GPA:95.00,teacherSelect: true, 
            teacherName: 'BO'
        },
        {
            number: "2019214653", password: "123456", name: "Lily",
            specialty: "计算机科学与技术",GPA:98.00, teacherSelect: false
        },
    ]
    return students
}
export function listTeachers():Teacher[]{
    const teachers:Teacher[]=[
        {
            number: "BO", password: "123456", name: "BO", stuNumber: 2, title: "博士后",
            studentList: [
                {
                    number: "2019214389", password: "2019214389", name: "Vivian",specialty: "计算机科学与技术", GPA: 95.00, teacherSelect: true, teacherName: 'BO'
                }
            ]
        },
        {
            number: "BOGod", password: "123456", name: "BOGod", stuNumber: 1, title: "博士后",
            studentList:[]
        }
    ]
    return teachers
}
export function getTeacher(teacherlist:Teacher[],userName:String){
    return teacherlist.find((teacher)=>teacher.name==userName)
}
export function getStudent(studentlist:Student[],userName:String){
    return studentlist.find((student)=>student.name==userName)
}