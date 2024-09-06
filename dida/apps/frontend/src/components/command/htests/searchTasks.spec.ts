/**
 * 测试搜索任务 searchTasks 与 resetSearchTasks 方法
 * 目标方法中使用了 tasksStore 与 listProjectsStore
 * 因此需要 mock 这两个 store
 * store 中使用了 pinia 
 * 因此需要使用 createTestingPinia 创建一个 pinia 实例
 * 
 * tasksStore 与 listProjectsStore 中设计到网络请求返回了数据
 * 因此需要 mock 网络请求返回的值
 * 
 * 测试点
 * 1. 可通过 title 搜索到任务
 * 2. 可通过 desc 搜索到任务
 * 3. 当搜索不到任务时，返回空数组
 * 4. 当任务状态为 active 时，返回的 from 为 listProject
 * 5. 当任务状态为 complete 时，返回的 from 为 completeSmartProject
 * 6. 当调用 resetSearchTasks 时，清空搜索结果
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useSearchTasks } from '../searchTasks'
import { TasksSelectorType, useListProjectsStore, useTasksStore } from '@/store'
import { barkListProject, barkTasks } from '@/tests/fixture'
import { SmartProjectName } from '@/store/smartProjects'

describe('searchTasks', () => {
  beforeEach(() => {
    // mock 一个 pinia 实例
    createTestingPinia({
      createSpy: vi.fn,
    })

    // mock tasksStore 的 findAllTasksNotRemoved 方法 直接 mock 返回的数据
    const tasksStore = useTasksStore()
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(
      async () => barkTasks,
    )

    // mock useListProjectsStore 的 findProject 方法 直接 mock 返回的数据
    const listProjectsStore = useListProjectsStore()
    vi.mocked(listProjectsStore.findProject).mockImplementation(
      () => barkListProject,
    )

    // 每次执行测试前，清空搜索结果
    const { resetSearchTasks } = useSearchTasks()
    resetSearchTasks()
  })
  it('should be search a task by title', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('叫')
    // 验证搜索结果
    expect(filteredTasks.value.length).toBe(2)
    expect(filteredTasks.value[0].item).toHaveProperty('id')
    expect(filteredTasks.value[0].item).toHaveProperty('title')
    expect(filteredTasks.value[0].item).toHaveProperty('desc')
    expect(filteredTasks.value[0].item).toHaveProperty('done')
    expect(filteredTasks.value[0].item).toHaveProperty('from')
    expect(filteredTasks.value[0].item.done).toBe(false)
    expect(filteredTasks.value[1].item.done).toBe(true)
    // 根据完成与否，验证 from 是否正确
    expect(filteredTasks.value[0].item.from).toEqual({
      id: '2',
      name: 'bark',
      type: TasksSelectorType.listProject,
    })
    expect(filteredTasks.value[1].item.from).toEqual({
      name: SmartProjectName.Complete,
      type: TasksSelectorType.smartProject,
    })
  })

  it('should be search a task by desc', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('蛙叫你')
    expect(filteredTasks.value.length).toBe(2)
    expect(filteredTasks.value[0].item.desc).toBe('蛙叫你')
    expect(filteredTasks.value[1].item.desc).toBe('蛙再叫你')
    expect(filteredTasks.value[0].item).toHaveProperty('id')
    expect(filteredTasks.value[0].item).toHaveProperty('title')
    expect(filteredTasks.value[0].item).toHaveProperty('desc')
    expect(filteredTasks.value[0].item).toHaveProperty('done')
    expect(filteredTasks.value[0].item).toHaveProperty('from')
    expect(filteredTasks.value[0].item.done).toBe(false)
    expect(filteredTasks.value[1].item.done).toBe(true)
    // 根据完成与否，验证 from 是否正确
    expect(filteredTasks.value[0].item.from).toEqual({
      id: '2',
      name: 'bark',
      type: TasksSelectorType.listProject,
    })
    expect(filteredTasks.value[1].item.from).toEqual({
      name: SmartProjectName.Complete,
      type: TasksSelectorType.smartProject,
    })
  })

  it('should not be found when the task does not exist', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('不存在')
    expect(filteredTasks.value.length).toBe(0)
  })

  it('should be task\'s project is listProject when status is active', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('叫')
    expect(filteredTasks.value[0].item.from).toEqual({
      id: '2',
      name: 'bark',
      type: TasksSelectorType.listProject,
    })
  })

  it('should be task\'s project is completeSmartProject when status is complete', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('蛙')
    expect(filteredTasks.value[1].item.from).toEqual({
      name: SmartProjectName.Complete,
      type: TasksSelectorType.smartProject,
    })
  })

  it('should be reset search tasks', async () => {
    const { searchTasks, filteredTasks, resetSearchTasks } = useSearchTasks()
    await searchTasks('叫')
    expect(filteredTasks.value.length).toBe(2)
    resetSearchTasks()
    expect(filteredTasks.value.length).toBe(0)
  })
})
