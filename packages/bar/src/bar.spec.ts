import { expect } from 'chai'
import 'mocha'
import { addOneAndTwo } from './bar'

describe('bar', () => {
  it('should have correct result', () => {
    expect(addOneAndTwo).to.equal(3)
  })
})
