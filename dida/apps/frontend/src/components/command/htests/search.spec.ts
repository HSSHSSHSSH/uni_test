// 私有方法不用测试！！！！

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearch } from '../search'

const searchCommands = vi.fn()
const resetSearchCommands = vi.fn()
vi.mock('../searchCommands', () => {
  return {
    useSearchCommands() {
      return {
        searchCommands,
        resetSearchCommands,
      }
    },
  }
})

const searchTasks = vi.fn()
const resetSearchTasks = vi.fn()
vi.mock('../searchTasks', () => {
  return {
    useSearchTasks() {
      return {
        searchTasks,
        resetSearchTasks,
      }
    },
  }
})

describe('search', () => {
  beforeEach(async () => {
    vi.useFakeTimers()
    // 在每个测试用例开始前执行以下操作
    const { resetSearch } = useSearch()
    // 重置搜索状态，清空搜索内容，重置 loading 和 searching 状态
    resetSearch()
    await vi.runAllTimersAsync() // watch 是异步的，，避免多粗调用
    // 清除所有模拟函数的调用记录和实现,避免 resetSearch 被多次调用
    vi.clearAllMocks()
  })

  it('loading should be true when search is not empty', async () => {
    const { loading, search } = useSearch()

    search.value = 'test'

    // 模拟防抖的定时器
    vi.useFakeTimers()

    // 等待异步操作完成
    await vi.advanceTimersToNextTimerAsync()

    expect(loading.value).toBe(true)
  })

  it('loading should be false when search is completed', async () => {
    const { loading, search } = useSearch()

    search.value = 'test'

    // 等待异步操作完成
    await vi.advanceTimersToNextTimerAsync()
    expect(loading.value).toBe(true)
    // 等待 handleSearch 执行完成
    await vi.advanceTimersToNextTimerAsync()
    expect(loading.value).toBe(false)
  })

  it('search task', async () => {
    const { search } = useSearch()

    search.value = 'test'

    // await vi.advanceTimersToNextTimerAsync()
    await vi.runAllTimersAsync()
    expect(searchTasks).toBeCalledWith('test')
  })

  it('search command', async () => {
    const { search } = useSearch()

    search.value = '>test'

    // await vi.advanceTimersToNextTimerAsync()
    await vi.runAllTimersAsync()
    expect(searchCommands).toBeCalledWith('test')
  })

  it('should be reset when search is empty', async () => {
    // 不要这么写，，一个测试中关注点过多，通常一个测试一个关注点
    const { search, loading, searching } = useSearch()

    search.value = 'test'
    await vi.advanceTimersToNextTimerAsync()
    expect(loading.value).toBe(true)
    await vi.runAllTimersAsync()
    expect(loading.value).toBe(false)
    expect(searching.value).toBe(true)
    search.value = ''
    await vi.runAllTimersAsync()
    expect(loading.value).toBe(false)
    expect(searching.value).toBe(false)
    expect(resetSearchCommands).toBeCalled()
    expect(resetSearchTasks).toBeCalled()
  })
})
