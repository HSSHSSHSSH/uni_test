/* eslint-disable @typescript-eslint/indent */
/**
 * 测试拖拽函数
 * 需要测试：
 * 1.基本拖拽
 *  moveDistance < 0 向左拖拽
 *  moveDistance > 0 向右拖拽
 * 2.边界拖拽
 *  moveDistance < 0 向左拖拽，但是超出左边界，拖拽无效
 *  moveDistance > 0 向右拖拽，但是超出右边界，拖拽无效
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDrag } from '../drag'
import { fireEvent } from '@/tests/helper'

describe('drag', () => {
    afterEach(() => {
        fireEvent.mouseup(document)
    })
    describe('basic', () => {
        it('should moveDistance < 0 when moving to left', () => {
            const el = document.createElement('div')
            const moveSpy = vi.fn()
            useDrag({
                el,
                onMove: moveSpy,
            })
            // 使用 fireEvent 触发拖拽事件
            fireEvent.mousedown(el, { clientX: 3 })
            fireEvent.mousemove(document, { clientX: -1 })
            expect(moveSpy).toHaveBeenNthCalledWith(1, -4)
        })

        it('shoule moveDistance > 0 when moving to right', () => {
            const el = document.createElement('div')
            const moveSpy = vi.fn()
            useDrag({
                el,
                onMove: moveSpy,
            })
            // 使用 fireEvent 触发拖拽事件
            fireEvent.mousedown(el, { clientX: 3 })
            fireEvent.mousemove(document, { clientX: 6 })
            expect(moveSpy).toHaveBeenNthCalledWith(1, 3)
        })

        it('move mutiple times', () => {
            const el = document.createElement('div')
            const moveSpy = vi.fn()
            useDrag({
                el,
                onMove: moveSpy,
            })
            fireEvent.mousedown(el, { clientX: 3 })
            fireEvent.mousemove(document, { clientX: 1 })
            fireEvent.mouseup(document)

            fireEvent.mousedown(el, { clientX: -3 })
            fireEvent.mousemove(document, { clientX: -1 })
            fireEvent.mouseup(document)

            expect(moveSpy).toHaveBeenNthCalledWith(1, -2)
            expect(moveSpy).toHaveBeenNthCalledWith(2, 2)
        })
    })

    describe('edge drag', () => {
        it('should not beyond the limit', () => {
            const el = document.createElement('div')
            const moveSpy = vi.fn()
            useDrag({
                el,
                onMove: moveSpy,
                moveRange: [-10, 10],
            })

            // 超出左边界
            fireEvent.mousedown(el, { clientX: 5 })
            fireEvent.mousemove(document, { clientX: -15 })
            fireEvent.mouseup(document)
            expect(moveSpy).toHaveBeenCalledTimes(0)

            // 超出右边界
            fireEvent.mousedown(el, { clientX: 5 })
            fireEvent.mousemove(document, { clientX: 15 })
            fireEvent.mouseup(document)
            expect(moveSpy).toHaveBeenCalledTimes(0)


        })
    })
})
