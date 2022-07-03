import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {

  it('happy path', () => {
    const user = reactive({
      age: 10,
    })
    let nextAge;
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    user.age++
    expect(nextAge).toBe(12)
  })

  it('should return runner when call effect', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(11)

    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })

  it('scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    })
    const obj = reactive({ foo: 1 })
    // 第二个参数obj，键scheduler是一个函数
    const runner = effect(() => {
      dummy = obj.foo
    },
      { scheduler }
    )
    // 一开始不会执行
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    // 值改变，调用schaduler，并不会调用第一个参数
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)

    // 调用runner执行第一个参数fn
    run()
    expect(dummy).toBe(2)
  })
})