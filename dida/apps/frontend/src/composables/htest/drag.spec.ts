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
                
            })
        })
    })
    
    describe('edge drag', () => {

    })
})