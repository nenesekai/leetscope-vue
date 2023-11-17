interface Assignment {
  id: string
  uid: string
  title: string
  description?: string
  createTime: Date
  deadline: Date
  allowedAttempts: number
}