import { expect } from 'chai'
import 'mocha'
import { add } from './webglUtil'

describe('webgl-util', () => {
  it('should add two number', () => expect(add(1, 2)).to.equal(3))
})
