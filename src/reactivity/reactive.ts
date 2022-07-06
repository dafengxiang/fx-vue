import { track, trigger } from './effect'
import { mutableHandles, readonlyHandles } from './baseHandles'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

function createActiveObject(raw: any, baseHandles) {
  return new Proxy(raw, baseHandles)
}