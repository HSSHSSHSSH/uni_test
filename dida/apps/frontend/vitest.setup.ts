import 'fake-indexeddb/auto'
import { config } from '@vue/test-utils'
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'
import { beforeEach, vi } from 'vitest'

function setupRouterMock() {
  const router = createRouterMock({ // 创建一个路由模拟器
    spy: { // 用当前测试框架的 api 来创建路由模拟器
      create: fn => vi.fn(fn), // 创建一个 spy 函数
      reset: spy => spy.mockClear(), // 重置 spy 函数
    },
  })

  beforeEach(() => {
    router.reset()
    injectRouterMock(router) // 注入路由模拟器
  })

  // 将收集到的路由模拟插件注入模拟 vue 实例
  config.plugins.VueWrapper.install(VueRouterMock)
}

setupRouterMock()

const originalConsoleWarn = console.warn
console.warn = (log: string) => {
  if (!log.includes('[Vue Router warn]'))
    return originalConsoleWarn(log)
}
