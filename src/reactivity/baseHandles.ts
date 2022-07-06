
import { track, trigger } from './effect'
const get = createGetter()
function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    // 依赖收集
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key)
    return res
  }
}

export const mutableHandles = {
  get,
  set: createSetter()
}

export const readonlyHandles = {
  get,
  set(target, key, value) {
    return true
  }
}