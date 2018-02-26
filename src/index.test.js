// @flow
import {myFunc} from './index'

test('Should log', () => {
  global.console = {
    log: jest.fn()
  }
  
  myFunc()
  
  expect(console.log.mock.calls.length).toEqual(1)
})
