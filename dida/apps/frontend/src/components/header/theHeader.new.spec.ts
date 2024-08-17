import { describe, expect, it, vi } from 'vitest'
import { GITHUB_URL, openGithub, useGoto } from '@/composables'
import { RouteNames } from '@/router/const'
import { useSetup } from '@/tests/helper'

describe('the header', () => {
  it('should go to home', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })
    // 判断路由push函数是否调用、
    expect(router.push).toHaveBeenCalledWith({
      name: RouteNames.HOME,
    })
  })

  it('should go to settings', () => {
    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()
      gotoSettings()
    })
    expect(router.push).toHaveBeenCalledWith({
      name: RouteNames.SETTINGS,
    })
  })

  it('should open github', () => {
    window.open = vi.fn()
    openGithub()
    expect(window.open).toHaveBeenCalledWith(GITHUB_URL)
  })
})
