/**
 * header 组件测试，有 3 个功能
 * 1. 点击 logo 跳转到首页 （router.push）
 * 2. 点击设置跳转到设置页面
 * 3. 点击 github 跳转到 github
 * 
 * 此测试中使用 Mock router 的方式来测试
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { GITHUB_URL, openGithub, useGoto } from '@/composables'
import { RouteNames } from '@/router/const'

const pushFn = vi.fn()

vi.mock('vue-router')
vi.mocked(useRouter).mockReturnValue({
  push: pushFn,
} as any)
describe('test header with mock router', () => {
  afterEach(() => {
    /**
     * 若有多个测试用例使用了同一个 mock 函数，则需要清除所有的 mock 函数
     * 否则难以区分 mock fn 中的属性实在哪个测试用例中改变的
     */
    vi.clearAllMocks()
  })

  it('should go to home', () => {
    const { gotoHome } = useGoto()
    gotoHome()
    expect(pushFn).toHaveBeenCalledWith({
      name: RouteNames.HOME,
    })
  })

  it('should go to settings', () => {
    const { gotoSettings } = useGoto()
    gotoSettings()
    expect(pushFn).toHaveBeenCalledWith({
      name: RouteNames.SETTINGS,
    })
  })

  it('should open github', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    openGithub()
    expect(windowOpenSpy).toHaveBeenCalledWith(GITHUB_URL)
  })
})
