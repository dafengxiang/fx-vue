import { track, trigger } from './effect'
import { mutableHandles, readonlyHandles } from './baseHandles'


export function reactive(raw) {
  return createActiveObject(raw, mutableHandles)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles)
}

export function isReactive(value){
  return value['is_reactive']
}

function createActiveObject(raw: any, baseHandles) {
  return new Proxy(raw, baseHandles)
}