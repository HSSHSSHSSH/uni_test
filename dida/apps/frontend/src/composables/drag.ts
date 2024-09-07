import { useEventListener } from '@vueuse/core'

type MoveRange = [number, number]

interface DragOptions {
  el: HTMLDivElement
  moveRange?: MoveRange
  onMove: (moveDistance: number) => void
}

export function useDrag(options: DragOptions) {
  const { onMove, moveRange, el } = options

  // 添加鼠标按下事件监听器
  useEventListener(el, 'mousedown', (e: MouseEvent) => {
    e.preventDefault()

    let startDragX = e.clientX
    let moveDistance = 0

    // 添加鼠标移动事件监听器
    const removeMousemove = useEventListener(
      document,
      'mousemove',
      (e: MouseEvent) => {
        // 计算移动距离
        moveDistance = e.clientX - startDragX
        // 如果设置了移动范围，进行边界检查
        if (moveRange) {
          const nextPoint = e.clientX + moveDistance
        //   // 如果超出左边界，停止移动
          if (nextPoint <= moveRange[0]) {
            return
          }

        //   // 如果超出右边界，停止移动
          if (nextPoint >= moveRange[1]) {
            return
          }
        }
        // 调用移动回调函数
        onMove(moveDistance)
        // 更新起始位置
        startDragX = e.clientX
      },
    )

    // 添加鼠标松开事件监听器
    const removeMouseup = useEventListener(document, 'mouseup', () => {
      // 移除鼠标松开和移动事件监听器
      removeMouseup()
      removeMousemove()
    })
  })
}
