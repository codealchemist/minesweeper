const debounced = {}

const debounce = (callback, ms = 500) => {
  if (debounced[callback]) {
    clearTimeout(debounced[callback].timer)
  }

  debounced[callback] = {
    timer: setTimeout(callback, ms)
  }
}

export default debounce
