import { TaskStatus } from '@/store'

export const tasks = [
  {
    id: '0',
    title: '吃饭',
    content: '今天吃什么',
    status: TaskStatus.ACTIVE,
    projectId: '1',
    position: 1,
  },
  {
    id: '1',
    title: '写代码',
    content: '今天写代码了嘛',
    status: TaskStatus.COMPLETED,
    projectId: '1',
    position: 2,
  },
]

export const barkTasks = [
  {
    id: '0',
    title: '叫！',
    content: '蛙叫你',
    status: TaskStatus.ACTIVE,
    projectId: '2',
    position: 1,
  },
  {
    id: '1',
    title: '再叫！',
    content: '蛙再叫你',
    status: TaskStatus.COMPLETED,
    projectId: '2',
    position: 2,
  },
]
