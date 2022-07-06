import { readonly,isReadonly } from '../reactive'
describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(wrapped.foo).toBe(1)
  })

  it('warn', () => {
    const user = readonly({
      age: 10
    })

    // 测试技术点mock
    console.warn = jest.fn()

    user.age = 11
    expect(console.warn).toBeCalledTimes(1)
  })
})