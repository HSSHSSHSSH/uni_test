/**
 * header 组件测试，有 3 个功能
 * 1. 点击 logo 跳转到首页 （router.push）
 * 2. 点击设置跳转到设置页面
 * 3. 点击 github 跳转到 github
 * 
 * 此测试中使用 Mock vue 的方式来测试
 * 使用 useSetup 来创建一个 vue 实例，在 setup 中使用 useGoto 中的函数，来测试
 */

import { describe, expect, it, vi } from 'vitest'
import { GITHUB_URL, openGithub, useGoto } from '@/composables'
import { RouteNames } from '@/router/const'
import { useSetup } from '@/tests/helper'

describe('test header with mock vue', () => {
  it('should go to home', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })
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
