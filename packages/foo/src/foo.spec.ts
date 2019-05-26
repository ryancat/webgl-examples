import { expect } from 'chai'
import 'mocha'
import { add } from './foo'

describe('foo', () => {
  it('should add two number', () => expect(add(1, 2)).to.equal(3))
})
