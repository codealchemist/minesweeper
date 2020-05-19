import { useState, useEffect } from 'react'

const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false)

  useEffect(() => {
    let timerId
    if (startLongPress) {
      timerId = setTimeout(callback, ms)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [callback, ms, startLongPress])

  const onEvent = (event, value) => {
    event.preventDefault()
    event.stopPropagation()
    setStartLongPress(value)
  }

  return {
    onMouseDown: (event) => onEvent(event, true),
    onMouseUp: (event) => onEvent(event, false),
    onMouseLeave: (event) => onEvent(event, false),
    onTouchStart: (event) => onEvent(event, true),
    onTouchEnd: (event) => onEvent(event, false)
  }
}

export default useLongPress
