import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useCommandModal } from '../commandModal'
import * as misc from '@/composables/misc'
import { fireEvent } from '@/tests/helper/fireEvent'
import { useSetup } from '@/tests/helper/component'

describe('commandModal', () => {
  beforeEach(() => {
    // 重置 useCommandModal 中的 showCommandModal 为 false
    useCommandModal().closeCommandModal()
  })

  it('should be open command modal', () => {
    const { openCommandModal, showCommandModal } = useCommandModal()

    openCommandModal()

    expect(showCommandModal.value).toBe(true)
  })

  it('should be close command modal', () => {
    const { closeCommandModal, showCommandModal } = useCommandModal()

    closeCommandModal()

    expect(showCommandModal.value).toBe(false)
  })

  it('should be open command modal when press cmd+k on Mac', () => {
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => true))

    /**
     * 在 registerKeyboardShortcut 函数中，
     * 使用 onMounted 和 onUnmounted 来注册和卸载事件监听器
     * 所以需要一个模拟的 vue 组件环境，即 useSetup
     */
    // registerKeyboardShortcut()
    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      metaKey: true,
    })

    expect(showCommandModal.value).toBe(true)
    wrapper.unmount()
  })

  it('should be open command modal when press ctrl+k on Windows', () => {
    const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => false))

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      ctrlKey: true,
    })

    expect(showCommandModal.value).toBe(true)
    wrapper.unmount()
  })
})
