import 'mocha';
import { expect } from 'chai';
import { addOneAndTwo } from './bar';

describe('bar', () => {
  it('should have correct result', () => {
    expect(addOneAndTwo).to.equal(3);
  });
});
