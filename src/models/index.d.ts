interface Assignment {
  id: string
  uid: string
  title: string
  description?: string
  createTime: string
  deadline: string
  allowedAttempts: number
}

interface Result {
  code: string,
  msg: string
}