import alquery from '../src/index.js'

// target: undefined
test(`parseCall() occurs error`, () => {
  const call = () => alquery.parseCall()
  const error = new Error(
    '[parseCall] Not passed call target to be used in query statement.'
  )
  expect(call).toThrow(error)
})

// target: null
test(`parseCall(null) occurs error`, () => {
  const target = null
  const call = () => alquery.parseCall(target)
  const error = new Error(
    '[parseCall] Not passed call target to be used in query statement.'
  )
  expect(call).toThrow(error)
})

// target: array
test(`parseCall(['my_procedure']) returns 'my_procedure()'`, () => {
  const target = ['my_procedure']
  const call = () => alquery.parseCall(target)
  const error = new Error(
    '[parseCall] Call target to use in the query statement is not specified.'
  )
  expect(call).toThrow(error)
})

// target: string
test(`parseCall('my_procedure') returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const call = alquery.parseCall(target)
  expect(call).toBe('my_procedure()')
})

// target: string, parameters: null
test(`parseCall('my_procedure', null) returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const call = alquery.parseCall(target)
  expect(call).toBe('my_procedure()')
})

// target: string, parameters: array
test(`parseCall('my_procedure', []) returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const parameters = []
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure()')
})

test(`parseCall('my_procedure', ['param1']) returns 'my_procedure(?)'`, () => {
  const target = 'my_procedure'
  const parameters = ['param1']
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?)')
})

test(`parseCall('my_procedure', ['param1', 'param2']) returns 'my_procedure(?, ?)'`, () => {
  const target = 'my_procedure'
  const parameters = ['param1', 'param2']
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?, ?)')
})

// target: string, parameters: object
test(`parseCall('my_procedure', {}) returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const parameters = {}
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure()')
})

test(`parseCall('my_procedure', { col1: 'param1' }) returns 'my_procedure(?)'`, () => {
  const target = 'my_procedure'
  const parameters = { col1: 'param1' }
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?)')
})

test(`parseCall('my_procedure', { col1: 'param1', col2: 'param2' }) returns 'my_procedure(?, ?)'`, () => {
  const target = 'my_procedure'
  const parameters = { col1: 'param1', col2: 'param2' }
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?, ?)')
})

// target: string, parameters: string
test(`parseCall('my_procedure', '') returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const parameters = ''
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure()')
})

test(`parseCall('my_procedure', 'param1') returns 'my_procedure(?)'`, () => {
  const target = 'my_procedure'
  const parameters = 'param1'
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?)')
})

test(`parseCall('my_procedure', 'param1, param2') returns 'my_procedure(?, ?)'`, () => {
  const target = 'my_procedure'
  const parameters = 'param1, param2'
  const call = alquery.parseCall(target, parameters)
  expect(call).toBe('my_procedure(?, ?)')
})

// target: string, parameters: number
test(`parseCall('my_procedure', 35) returns 'my_procedure()'`, () => {
  const target = 'my_procedure'
  const parameters = 35
  const call = () => alquery.parseCall(target, parameters)
  const error = new Error(
    '[parseCall] Parameters for use in the Call query statement was incorrectly specified.'
  )
  expect(call).toThrow(error)
})
