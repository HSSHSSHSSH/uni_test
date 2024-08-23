import Fuse from 'fuse.js'
import { ref } from 'vue'
import { TaskStatus, completeSmartProject, useListProjectsStore, useTasksStore } from '@/store'
import type { TasksSelector } from '@/store'

interface SearchTaskItem {
  id: string
  title: string
  desc: string
  done: boolean
  from: TasksSelector | undefined
}

const filteredTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ['title', 'desc'],
})

export function useSearchTasks() {
  /**
   * 先把数据库中所有的任务拿到
   * 然后对数据进行处理，加入 title desc 字段，为后续使用 fuse 模糊搜索）做准备
   * 将上述处理后的数据作为 fuse 的数据源
   * 通过 input 进行模糊搜索，返回搜索结果
   * @param input
   */
  async function searchTasks(input: string) {
    const tasksStore = useTasksStore() // 这个方法内部仅仅是调用了 axios 请求数据
    const projectsStore = useListProjectsStore()

    const tasks = await tasksStore.findAllTasksNotRemoved() // 拿到了所有的数据
    console.log('tasks', tasks)
    // Convert tasks to a format suitable for Fuse.js search
    const fuseTasks = tasks.map((task) => {
      // Determine if the task is done based on its status
      const done = task.status === TaskStatus.COMPLETED
      // Determine the source of the task based on its completion status
      const from = done ? completeSmartProject : projectsStore.findProject(task.projectId)
      // Return a new object with the required properties for Fuse.js
      return {
        id: task.id!, // Ensure id is not undefined
        title: task.title,
        desc: task.content, // Assuming 'content' is the description of the task
        done, // Include the done status
        from, // Include the source of the task
      }
    })
    console.log('fuseTasks', fuseTasks)
    fuse.setCollection(fuseTasks)

    filteredTasks.value = fuse.search(input)
  }

  function resetSearchTasks() {
    filteredTasks.value = []
  }

  return {
    filteredTasks,
    searchTasks,
    resetSearchTasks,
  }
}
