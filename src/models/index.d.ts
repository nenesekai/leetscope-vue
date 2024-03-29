interface Assignment {
  id: string
  uid: string
  title: string
  description?: string
  createTime: string
  deadline: string
  allowedAttempts: number
}

interface Result<T> {
  code: string,
  msg: string,
  data?: T
}

interface User {
  id: string,
  name: string,
  isTeacher: boolean,
  isStudent: boolean
}

interface Submission {
  id: string,
  uid: string,
  assignmentId: string,
  fileName: string,
  isGraded: boolean,
  isPass: boolean,
  createTime: string
}