import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useSearchCommands } from './searchCommands'
import { useSearchTasks } from './searchTasks'
import { delay } from '@/utils'

const search = ref('')
const loading = ref(false)
const searching = ref(false)

let isInitialized = false

export function useSearch() {
  const { resetSearchCommands, searchCommands } = useSearchCommands()
  const { resetSearchTasks, searchTasks } = useSearchTasks()

  function init() {
    if (!isInitialized) {
      isInitialized = true

      // 使用 watchDebounced 来监听 search.value 的变化，并添加防抖
      watchDebounced(
        () => search.value,
        async (v) => {
          if (v) {
            // 设置加载状态为 true
            loading.value = true
            // 执行搜索操作
            await handleSearch(v)
            // 搜索完成后，设置加载状态为 false
            loading.value = false
            // 设置搜索状态为 true，表示搜索已完成
            searching.value = true
          }
        },
        { debounce: 500 }, // 设置 500ms 的防抖时间
      )

      // 监听搜索值的变化
      watch(
        () => search.value,
        (v) => {
          // 当搜索值为空字符串时
          if (v === '') {
            // 重置搜索状态
            resetSearch()
            // 重置命令搜索
            resetSearchCommands()
            // 重置任务搜索
            resetSearchTasks()
          }
        },
      )
    }
  }

  const isSearchCommand = computed(() => {
    return search.value.startsWith('>')
  })

  function resetSearch() {
    search.value = ''
    loading.value = false
    searching.value = false
  }

  async function handleSearch(input: string) {
    if (isSearchCommand.value) {
      searchCommands(input.trimEnd().slice(1))
    }
    else {
      await delay()
      await searchTasks(input)
    }
  }

  init()

  return {
    loading,
    searching,
    search,
    isSearchCommand,
    resetSearch,
  }
}
