/**
 * 测试搜索命令中的 searchCommands 与 resetSearchCommands 方法
 * 
 * searchCommands 中使用到了 commands 数据，所以需要对 commands 进行数据赋值, 直接返回数据
 */

import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { useSearchCommands } from '../searchCommands'
import { useCommand } from '@/composables/command'

describe('search commands', () => {
  beforeAll(() => {
    const { addCommand } = useCommand()
    addCommand({ name: '前往主页', execute: () => {} })
    addCommand({ name: '删库跑路', execute: () => {} })
  })

  beforeEach(() => {
    const { resetSearchCommands } = useSearchCommands()
    resetSearchCommands()
  })

  it('should be search a command', () => {
    const { searchCommands, filteredCommands } = useSearchCommands()
    searchCommands('前往主页')
    expect(filteredCommands.value[0].name).toBe('前往主页')
    expect(filteredCommands.value.length).toBe(1)
  })

  it('should be search all commands', () => {
    const { searchCommands, filteredCommands } = useSearchCommands()
    searchCommands('')
    expect(filteredCommands.value.length).toBe(2)
  })

  it('should be reset search commands', () => {
    const { searchCommands, filteredCommands, resetSearchCommands } = useSearchCommands()
    searchCommands('前往主页')
    expect(filteredCommands.value.length).toBe(1)
    resetSearchCommands()
    expect(filteredCommands.value.length).toBe(2)
  })
})
