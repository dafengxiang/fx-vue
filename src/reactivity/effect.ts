
class ReactiveEffect {
  private _fn: any
  constructor(_fn) {
    this._fn = _fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}


// targetMap结构伪代码
// targetMap = {
//   {age: 10}: {
//     age: [ReactiveEffect1, ReactiveEffect2]
//   }
// }

const targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    effect.run()
  }
}

let activeEffect
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}