import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { useGoto } from '@/composables'
import { RouteNames } from '@/router/const'

const pushFn = vi.fn()

// 对第三方模块进行模拟
vi.mock('vue-router')

// 对第三方模块中需要使用到的函数进行模拟
vi.mocked(useRouter as () => { push: Function }).mockImplementation(() => {
  return {
    push: pushFn,
  }
})

describe('the header', () => {
  beforeEach(() => {
    pushFn.mockClear() // 清空每个测试 case 的副作用
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
})
