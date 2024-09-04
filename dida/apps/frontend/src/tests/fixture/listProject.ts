import type { ListProject } from '@/store'
import { TasksSelectorType } from '@/store'

export const liveListProject: ListProject = {
  id: '1',
  name: '生活',
  type: TasksSelectorType.listProject,
}

export const barkListProject: ListProject = {
  id: '2',
  name: 'bark',
  type: TasksSelectorType.listProject,
}
