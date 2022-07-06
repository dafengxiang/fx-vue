import { readonly } from '../reactive'
describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
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